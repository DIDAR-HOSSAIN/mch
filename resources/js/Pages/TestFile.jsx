// Retrieve all input data
$testData = $request->all();

// Extract tests array
$tests = $request->input('tests', []);

// Structure the data for a response
$response = [
    'status' => 'success',
    'message' => 'Data received successfully',
    'data' => [
        'molecular_reg' => [
            'name' => $testData['name'],
            'contact_no' => $testData['contact_no'],
            'age' => $testData['age'],
            'gender' => $testData['gender'],
            'discount' => $testData['discount'],
            'paid' => $testData['paid'],
        ],
        'tests' => $tests,
    ],
];

// Return the structured response
return response()->json($response, 200);