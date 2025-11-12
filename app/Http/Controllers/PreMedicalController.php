<?php

namespace App\Http\Controllers;

use App\Models\PreMedical;
use App\Http\Requests\StorePreMedicalRequest;
use App\Http\Requests\UpdatePreMedicalRequest;
use App\Models\Country;
use Carbon\Carbon;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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

    public function index()
    {
        $preMedicals = Premedical::all();
        return inertia('Gamca/Pre-Medical/ViewPreMedical', [
            'auth' => ['user' => auth()->user()],
            'preMedicals' => $preMedicals,
            'flash' => session()->get('flash'),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $countries = Country::select('name', 'country_code')->get();

        return inertia('Gamca/Pre-Medical/CreatePreMedical', [
            'auth' => ['user' => auth()->user()],
            'countries' => $countries,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validate([
            // ✅ Required Fields
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

            // ✅ Must have
            'country_code'      => 'required|string|max:10',

            // ✅ Optional Fields
            'country_name'      => 'nullable|string|max:100',
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
                'max:1024',
            ],
        ]);

        if ($user = Auth::user()) {
            $data['user_name'] = $user->name;
        } else {
            return response()->json(['error' => 'User not authenticated'], 401);
        }

        $data['entry_date'] = $data['entry_date'] ?? now()->toDateString();

        // ✅ Country name auto-fill
        $country = Country::where('country_code', $data['country_code'])->first();
        $data['country_name'] = $country?->name ?? 'Unknown';

        // ✅ Generate ID (e.g., 25KU101)
        $data['pre_medical_id'] = $this->generatePreMedicalId($data['country_code']);


        // ✅ Passport validity checkbox logic (optional)
        $data['passport_validity'] = $request->boolean('passport_validity') ? 10 : 5;

        // // ✅ Handle image upload (optional)
        // if ($request->hasFile('photo')) {
        //     $imagePath = public_path('images/passengers/');
        //     if (!File::exists($imagePath)) {
        //         File::makeDirectory($imagePath, 0755, true);
        //     }

        //     $manager = new ImageManager(new Driver());
        //     $name_gen = hexdec(uniqid()) . '.' . $request->file('photo')->getClientOriginalExtension();
        //     $img = $manager->read($request->file('photo')->getRealPath())->resize(300, 300);
        //     $img->save($imagePath . $name_gen, 80);
        //     $data['photo'] = $name_gen;
        // }


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

        PreMedical::create($data);

        return redirect()->route('pre-medical.index')->with('success', 'Pre-Medical entry created successfully!');
    }

    private function generatePreMedicalId($countryCode)
    {
        $countryCode = strtoupper($countryCode ?? 'XX'); // fallback protection
        $prefix = 'P';
        $year = now()->format('y'); // 25 for 2025

        // Find the last serial number for this year + country
        $latest = PreMedical::where('pre_medical_id', 'like', "{$prefix}-{$year}{$countryCode}%")
            ->latest('id')
            ->value('pre_medical_id');

        if ($latest) {
            $lastSerial = intval(substr($latest, -3)) + 1;
        } else {
            $lastSerial = 101; // starting number
        }

        $serial = str_pad($lastSerial, 3, '0', STR_PAD_LEFT);

        return "{$prefix}-{$year}{$countryCode}{$serial}";
    }




    /**
     * Display the specified resource.
     */
    public function show(PreMedical $preMedical)
    {
        return Inertia::render('Gamca/Pre-Medical/ShowPreMedical', ['preMedical' => $preMedical]);
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

    public function summaryReport(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = PreMedical::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Gamca/Pre-Medical/Reports/DateWiseBalanceSummary', [
            'data' => $data
        ]);
    }

    public function summaryDetails(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = PreMedical::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Gamca/Pre-Medical/Reports/DateWiseBalanceSummaryDetails', [
            'data' => $data
        ]);
    }

    public function duesCheck(Request $request)
    {
        $startDate = $request->input('start_date');
        $endDate = $request->input('end_date');

        $query = PreMedical::query();

        if ($startDate && $endDate) {
            $startDate = Carbon::createFromFormat('Y-m-d', $startDate)->startOfDay();
            $endDate = Carbon::createFromFormat('Y-m-d', $endDate)->endOfDay();

            $query->whereBetween('entry_date', [$startDate, $endDate]);
        }

        $data = $query->get();

        return Inertia::render('Gamca/Pre-Medical/Reports/DuesReport', [
            'data' => $data
        ]);
    }

}
