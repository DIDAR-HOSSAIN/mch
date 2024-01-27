<?php

namespace App\Http\Controllers;

use App\District;
use App\Dopereg;
use App\Test;
use App\Thana;
use Illuminate\Http\Request;
use Image;
class DoperegController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        $doperegs =Dopereg:: with('district','policeStation')->paginate(15);
        return view('backend.dope_reg.index',compact('doperegs'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        $formType = 'create';
        $districts = District::orderBy('district_name')->pluck('district_name', 'district_name');
//        $pStations = Thana::orderBy('thana_name')->pluck('thana_name', 'thana_name');
//        $tests = Test::all();
        $pStations = [];
        return view('backend.dope_reg.create', compact('formType', 'districts', 'pStations'));
//        return view('backend.dope_reg_tab.create', compact('formType', 'districts', 'pStations'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //        $this->validate($request, [
//            'reg_date' => 'required',
//            'name' => 'required',
//            'passport_no' => 'required',
//            'address' => 'required',
//            'districts' => 'required',
//            'thana' => 'required',
//            'image' => 'required',
//            'dob' => 'required',
//            'age' => 'required',
//            'nid' => 'required',
//            'collection_type' => 'required',
//            'reference' => 'required',
//            'reg_fee' => 'required',
//            'discount' => 'required',
//            'total' => 'required',
//            'paid' => 'required',
//            'payment_type' => 'required',
//            'account_head' => 'required',
//        ]);

        try{
            $data = $request->all();
            $data = $request->except('reg_date');
            $data['reg_date'] = date('Y-m-d', strtotime($request->reg_date));
//            $data['user_name'] = Auth::user()->id;
            if ($request->hasFile('image')){
                $image = $request->file('image');
                $file_name =time(). ('_') .$image->getClientOriginalName();
                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(300,300);
                $image_resize->save('backend-lib/images/patient/'.$file_name);
                $data ['image'] = $file_name;
                Dopereg::create($data);
                return redirect()->route('dopereg.create')->with('message', "Data Added Successfully");

            }else{
                $data = $request->all();
                $data ['image'] = "image Did't Add";
                Dopereg::create($data);


                return redirect()->route('dopereg.create')->with('message', "Data Added Successfully");

            }

        }catch (QueryException $e){
            return redirect()->back()->withInput()->withErrors($e->getMessage());
        }


//        try{
//            $incomes = $request->all();
//            Income::create($incomes);
//            $incomeData = $request->only('date', 'description', 'virtual_bd');
//            $incomeData['user_name'] = Auth::user();
//            $incomeId = Income::create($incomeData);
////            dd($incomeId->id);
//            foreach($request->income_type as $key => $v) {
//                $data = array(
//                    'income_id' => $incomeId->id,
//                    'income_type' => $request->income_type[$key],
//                    'received_type' => $request->received_type[$key],
//                    'amount' => $request->amount[$key],
//                );
//                Incomedetails::create($data);
//            }
//
//            return redirect()->route('incomes.create')->with('message', 'Data Added Successfully');
//        }catch (QueryException $e){
//            return redirect()->back()->withInput()->withErrors($e->getMessage());
//        }




    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Dopereg  $dopereg
     * @return \Illuminate\Http\Response
     */
    public function show(Dopereg $dopereg)
    {
        return view('backend.dope_reg.show', compact('dopereg'));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Dopereg  $dopereg
     * @return \Illuminate\Http\Response
     */
    public function edit(Dopereg $dopereg)
    {
        $formType = 'edit';
        $districts = District::orderBy('district_name')->pluck('district_name', 'district_name');
        $pStations = Thana::orderBy('thana_name')->pluck('thana_name', 'thana_name');
        return view('backend.dope_reg.create', compact('formType','dopereg','districts','pStations'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Dopereg  $dopereg
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Dopereg $dopereg)
    {
        try{
            $date = date('Y-m-d', strtotime($request->reg_date));
            $doperegs = $request->except('reg_date');
            $doperegs['reg_date'] = $date;
//            $samples['user_name'] = Auth::user()->id;

            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $file_name = time() . ('_') . $image->getClientOriginalName();
                $image_resize = Image::make($image->getRealPath());
                $image_resize->resize(300, 300);
                unlink(public_path("backend-lib/images/patient/$dopereg->image"));
                $image_resize->save('backend-lib/images/patient/' . $file_name);
                $doperegs ['image'] = $file_name;
            }
            $dopereg->update($doperegs);
            return redirect()->route('dopereg.index')->with('message', "Data has been updated successfully");
        }catch(QueryException $e){
            return redirect()->back()->withInput()->withErrors($e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Dopereg  $dopereg
     * @return \Illuminate\Http\Response
     */
    public function destroy(Dopereg $dopereg)
    {
        try {
            if (!empty($dopereg->image) && file_exists(public_path("backend-lib/images/patient/$dopereg->image"))) {
                unlink(public_path("backend-lib/images/patient/$dopereg->image"));
            };
            $dopereg->delete();
            return redirect()->route('dopereg.index')->with('message', 'Data has been deleted successfully');
        } catch (QueryException $e) {
            return redirect()->back()->withErrors($e->getMessage());
        }
    }

    public function getThana(Request $request){
//        dd($request->all());
        $pStations = Thana::where("district_name",$request->district_name)->pluck("thana_name","thana_name");

//        dd($pStations);
        return view('backend.dope_reg.thana',compact('pStations'));
    }


}
