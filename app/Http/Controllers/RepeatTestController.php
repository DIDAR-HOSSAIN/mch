<?php

namespace App\Http\Controllers;

use App\Models\RepeatTest;
use App\Http\Requests\StoreRepeatTestRequest;
use App\Http\Requests\UpdateRepeatTestRequest;
use App\Models\MedicalTest;
use App\Models\PreMedical;
use App\Models\RepeatTestItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RepeatTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = RepeatTest::with('preMedical')->orderBy('created_at', 'desc');

        // Search by passenger name or passport
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->whereHas('preMedical', function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhere('passport_no', 'like', "%{$search}%");
            });
        }

        // Filter by delivery_date range
        if ($request->filled('from_date')) {
            $query->whereDate('delivery_date', '>=', $request->input('from_date'));
        }
        if ($request->filled('to_date')) {
            $query->whereDate('delivery_date', '<=', $request->input('to_date'));
        }

        // Pagination (10 per page)
        $repeatTests = $query->paginate(10)->through(function ($test) {
            return [
                'id' => $test->id,
                'serial_no' => $test->serial_no,
                'delivery_date' => $test->delivery_date,
                'total' => $test->total,
                'net_pay' => $test->net_pay,
                'is_free' => $test->is_free,
                'deduct' => $test->deduct,
                'passenger_name' => $test->preMedical
                    ? $test->preMedical->first_name . ' ' . $test->preMedical->last_name
                    : '-',
                'passport_no' => $test->preMedical
                    ? $test->preMedical->passport_no
                    : '-',
            ];
        });

        return Inertia::render('Gamca/RepeatTest/ViewRepeatTest', [
            'repeatTests' => $repeatTests,
            'filters' => $request->only(['search', 'from_date', 'to_date'])
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Request $request)
    {
        $passportNo = $request->query('passport_no'); // URL থেকে পাসপোর্ট নম্বর
        $preMedical = null;

        if ($passportNo) {
            $preMedical = PreMedical::where('passport_no', $passportNo)->first();
        }

        $tests = MedicalTest::select('id', 'test_name', 'fee')->get();

        // সবসময় ফর্ম রেন্ডার করবে (পাসপোর্ট না থাকলেও)
        return Inertia::render('Gamca/RepeatTest/CreateRepeatTest', [
            'preMedical' => $preMedical,
            'tests' => $tests,
        ]);
    }





    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRepeatTestRequest $request)
    {
        // dd($request->all());
        $validated = $request->validate([
            'pre_medical_id' => 'required|integer|exists:pre_medicals,id',
            'delivery_date' => 'nullable|date',
            'is_free' => 'boolean',
            'deduct' => 'nullable|numeric',
            'total' => 'nullable|numeric',
            'net_pay' => 'nullable|numeric',
            'items' => 'nullable|array|min:1',
            'items.*.medical_test_id' => 'required|integer|exists:medical_tests,id',
            'items.*.amount' => 'required|numeric',
        ]);

        // 🔹 Serial number auto generate
        $serialNo = 'RT-' . str_pad(RepeatTest::count() + 1, 6, '0', STR_PAD_LEFT);

        DB::beginTransaction();
        try {
            $repeatTest = RepeatTest::create([
                'pre_medical_id' => $validated['pre_medical_id'],
                'delivery_date' => $validated['delivery_date'] ?? now(),
                'is_free' => $validated['is_free'] ?? false,
                'deduct' => $validated['deduct'] ?? 0,
                'total' => $validated['total'] ?? 0,
                'net_pay' => $validated['net_pay'] ?? 0,
                'serial_no' => $serialNo,
            ]);

            foreach ($validated['items'] as $item) {
                RepeatTestItem::create([
                    'repeat_test_id' => $repeatTest->id,
                    'medical_test_id' => $item['medical_test_id'],
                    'amount' => $item['amount'],
                ]);
            }

            DB::commit();
            // ✅ Redirect to print view
            return redirect()->route('repeat-tests.print', $repeatTest->id);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }


    /**
     * Display the specified resource.
     */
    public function show(RepeatTest $repeatTest)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(RepeatTest $repeatTest)
    {
        $repeatTest->load('items.medicalTest');
        $tests = MedicalTest::all();

        return Inertia::render('Gamca/RepeatTest/EditRepeatTest', [
            'repeatTest' => $repeatTest,
            'tests' => $tests,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateRepeatTestRequest $request, RepeatTest $repeatTest)
    {
        $validated = $request->validate([
            'delivery_date' => 'required|date',
            'is_free' => 'boolean',
            'deduct' => 'nullable|numeric',
            'total' => 'required|numeric',
            'net_pay' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.medical_test_id' => 'required|exists:medical_tests,id',
            'items.*.amount' => 'required|numeric',
        ]);

        DB::transaction(function () use ($repeatTest, $validated) {
            $repeatTest->update($validated);

            $repeatTest->items()->delete();
            foreach ($validated['items'] as $item) {
                $repeatTest->items()->create($item);
            }
        });

        return redirect()->back()->with('success', 'Repeat Test updated successfully!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(RepeatTest $repeatTest)
    {
        //
    }

    public function print($id)
    {
        $data = RepeatTest::with(['items.medicalTest', 'preMedical'])->findOrFail($id);
        return Inertia::render('Gamca/RepeatTest/RepeatMoneyReceipt', [
            'data' => $data
        ]);
    }

}
