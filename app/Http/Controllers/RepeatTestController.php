<?php

namespace App\Http\Controllers;

use App\Models\RepeatTest;
use App\Http\Requests\StoreRepeatTestRequest;
use App\Http\Requests\UpdateRepeatTestRequest;
use App\Models\MedicalTest;
use App\Models\PreMedical;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class RepeatTestController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $tests = MedicalTest::all();

        return Inertia::render('Gamca/RepeatTest/CreateRepeatTest', [
            'tests' => $tests,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRepeatTestRequest $request)
    {
        $validated = $request->validate([
            'pre_medical_id' => 'required|exists:pre_medicals,id',
            'delivery_date' => 'required|date',
            'is_free' => 'boolean',
            'deduct' => 'nullable|numeric',
            'total' => 'required|numeric',
            'net_pay' => 'required|numeric',
            'items' => 'required|array|min:1',
            'items.*.medical_test_id' => 'required|exists:medical_tests,id',
            'items.*.amount' => 'required|numeric',
        ]);

        DB::transaction(function () use ($validated) {
            $repeatTest = RepeatTest::create($validated);

            foreach ($validated['items'] as $item) {
                $repeatTest->items()->create($item);
            }
        });

        return redirect()->route('repeat-test.index')->with('success', 'Repeat Test created successfully!');
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
}
