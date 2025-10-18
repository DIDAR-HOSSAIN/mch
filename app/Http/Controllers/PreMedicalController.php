<?php

namespace App\Http\Controllers;

use App\Models\PreMedical;
use App\Http\Requests\StorePreMedicalRequest;
use App\Http\Requests\UpdatePreMedicalRequest;
use Exception;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class PreMedicalController extends Controller
{
    public function __construct()
    {
        $this->middleware('permission:pre-medical-list|pre-medical-create|pre-medical-edit|pre-medical-delete', ['only' => ['index', 'store']]);
        $this->middleware('permission:pre-medical-create', ['only' => ['create', 'store']]);
        $this->middleware('permission:pre-medical-edit', ['only' => ['edit', 'update']]);
        $this->middleware('permission:pre-medical-delete', ['only' => ['destroy']]);
        // $this->middleware('permission:pre-medical-summary-report', ['only' => ['summaryReport']]);
        // $this->middleware('permission:pre-medical-summary-details', ['only' => ['summaryDetails']]);
        // $this->middleware('permission:pre-medical-due-check', ['only' => ['duesCheck']]);
    }

    /**
     * Display a listing of the resource.
     */

    public function index(Request $request)
    {
        $search = $request->get('search');
        $pre_medicals = PreMedical::query()
            ->when(
                $search,
                fn($q) =>
                $q->where('passport_no', 'like', "%{$search}%")
                    ->orWhere('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
            )
            ->latest()
            ->paginate(10);
        // ->withQueryString();

        return inertia('Gamca/Pre-Medical/ViewPreMedical', [
            'auth' => ['user' => auth()->user()],
            'pre_medicals' => $pre_medicals,
            'filters' => ['search' => $search],
            'flash' => session()->get('flash'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Gamca/Pre-Medical/CreatePreMedical');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePreMedicalRequest $request)
    {
        $data = $request->validate([
            // ✅ Required Fields
            'short_code'        => 'required|string|max:50|unique:pre_medicals,short_code',
            'passport_no'       => 'required|string|max:50',
            'first_name'        => 'required|string|max:100',
            'date_of_issue'     => 'required|date',
            'place_of_issue'    => 'required|string|max:100',
            'date_of_birth'     => 'required|date',
            'sex'               => 'required|in:MALE,FEMALE,OTHER',
            'nationality'       => 'required|string|max:100',
            'religion'          => 'required|string|max:100',
            'profession'        => 'required|string|max:100',
            'mobile_no'         => 'required|string|max:20',
            'country_name'      => 'required|string|max:100',

            // ✅ Optional Fields
            'short_code'        => 'nullable|string|max:50|unique:pre_medicals,short_code',
            'last_name'         => 'nullable|string|max:100',
            'father_name'       => 'nullable|string|max:100',
            'mother_name'       => 'nullable|string|max:100',
            'report_after_days' => 'nullable|integer',
            'report_date'       => 'nullable|date',
            'serial_no'         => 'nullable|string|max:50',
            'amount'            => 'nullable|numeric',
            'is_free'           => 'boolean',
            'discount'          => 'nullable|numeric',
            'gcc_slip_no'       => 'nullable|string|max:50',
            'gcc_slip_date'     => 'nullable|date',
            'expire_days'       => 'nullable|integer',
            'photo' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg,gif',
                'max:80',
                'required_if:gender,Male',
            ],
        ]);

        $data['passport_validity'] = $request->boolean('passport_validity') ? 10 : 5;

        $imagePath = public_path('images/passengers/');

        // Check if the directory exists, if not, create it
        if (!File::exists($imagePath)) {
            File::makeDirectory($imagePath, 0755, true);
        }

        // Initialize ImageManager without specifying the driver
        $manager = new ImageManager(new Driver());

        // Handle image1
        if ($request->hasFile('photo')) {
            $name_gen = hexdec(uniqid()) . '.' . $request->file('photo')->getClientOriginalExtension();
            $img = $manager->read($request->file('photo')->getRealPath())->resize(300, 300);
            $img->save($imagePath . $name_gen, 80);
            $data['photo'] = $name_gen;
        }

        $preMedical = PreMedical::create($data);

        // ✅ Redirect using the newly created record's ID
        return redirect()->route('premedical.receipt', ['id' => $preMedical->id]);
    }

    /**
     * Display the specified resource.
     */
    public function show(PreMedical $preMedical)
    {
        return Inertia::render('Gamca/Pre-Medical/ShowPreMedical', ['preMedical'=> $preMedical]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    // public function edit(PreMedical $preMedical)
    // {
    //     return Inertia::render('Gamca/Pre-Medical/EditPreMedical', [
    //         'preMedical' => $preMedical,
    //     ]);
    // }

    // /**
    //  * Update the specified resource in storage.
    //  */
    // public function update(UpdatePreMedicalRequest $request, PreMedical $preMedical)
    // {
    //
    // }

    public function edit($id)
    {
        $preMedical = PreMedical::findOrFail($id);

        if (!$preMedical) {
            abort(404); // Or handle the error as needed
        }

        return Inertia::render('Gamca/Pre-Medical/EditPreMedical', [
            'preMedical' => $preMedical,
            'message' => session('message'),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $preMedical = PreMedical::findOrFail($id);

        // সব ফিল্ড আপডেট
        $preMedical->fill($request->except('photo'));

        // 🔥 ইমেজ চেক করা হচ্ছে
        if ($request->hasFile('photo')) {
            // আগের ইমেজ থাকলে মুছে ফেলো
            if ($preMedical->photo && file_exists(public_path('images/passengers/' . $preMedical->photo))) {
                unlink(public_path('images/passengers/' . $preMedical->photo));
            }

            $file = $request->file('photo');
            $filename = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('images/passengers'), $filename);
            $preMedical->photo = $filename;
        }

        $preMedical->save();

        return back()->with('flash', [
            'message' => 'Pre-Medical updated successfully!',
        ]);
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(PreMedical $preMedical)
    {
        $preMedical->delete();
        return redirect()->route('pre-medical.index')->with('success', '✅ Passenger Deleted successfully.');
    }

    public function premedicalMoneyReceipt($id)
    {
        $receipt = PreMedical::findOrFail($id);
        // dd($receipt);

        return Inertia::render('Gamca/Pre-Medical/MoneyReceipt', [
            'receipt' => $receipt,
        ]);
    }
}
