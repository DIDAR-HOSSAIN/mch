@extends('backend.layouts.master')

@section('style')

    <!--formden.js communicates with FormDen server to validate fields and submit via AJAX -->
    <script type="text/javascript" src="https://formden.com/static/cdn/formden.js"></script>

    <!-- Special version of Bootstrap that is isolated to content wrapped in .bootstrap-iso -->
    <link rel="stylesheet" href="https://formden.com/static/cdn/bootstrap-iso.css" />

    <!--Font Awesome (added because you use icons in your prepend/append)-->
    <link rel="stylesheet" href="https://formden.com/static/cdn/font-awesome/4.4.0/css/font-awesome.min.css" />

    <!-- Inline CSS based on choices in "Settings" tab -->
    <style>.bootstrap-iso .formden_header h2, .bootstrap-iso .formden_header p, .bootstrap-iso form{font-family: Arial, Helvetica, sans-serif; color: black}.bootstrap-iso form button, .bootstrap-iso form button:hover{color: white !important;} .asteriskField{color: red;}</style>


@endsection

@section('content')
    <div class="col-md-12">
        <div class="card">
            <div class="header">
                <h2 class="text-uppercase text-center" style="color:orange"> <strong> Add Patient Information  </strong> </h2>
            </div>
            <hr>
            <div class="body">

                @if($errors->any())
                    <div class="alert alert-danger">
                        @foreach($errors->all() as $error)
                            {{$error}}
                        @endforeach
                    </div>
                @endif

                @if(session('message'))
                    <div class="alert alert-success"> {{session('message')}}  </div>
                @endif

                    @if($formType == 'edit')
                            {!! Form::open(array('url' => "doperegs/$dopereg->id",'method' => 'PUT', 'enctype' =>'multipart/form-data')) !!}
                    @else
                        {!! Form::open(array('url' => "dopes",'method' => 'POST', 'enctype' =>'multipart/form-data')) !!}
                    @endif



                <div class="row">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-4">

{{--        <div class="form-group">--}}
{{--            {{Form::label("patient_id", "ID")}}--}}
{{--            {{Form::text('id',--}}
{{--                old('id') ? old('id') : (!empty($dope) ? $dope->id : null),--}}
{{--                ["class" => 'form-control',"id" => "id","readonly"]--}}
{{--            )}}--}}
{{--        </div> <!-- end form-group -->--}}

         <div class="form-group">
        {{ Form::label('reg_date', "Registration Date" ) }}
        {{ Form::text('reg_date',
            old('reg_date') ? old('reg_date') : (!empty($dopereg->reg_date) ? date('d-m-Y', strtotime($dopereg->reg_date)) : date('d-m-Y', strtotime(\Carbon\Carbon::now(+6))) ),
            ["class" => 'form-control',"id" => "reg_date", "required"]) }}
        </div> <!-- end form-group -->

        <div class="form-group">
            {{Form::label("name", "Name")}}
            {{Form::text('name',
                old('name') ? old('name') : (!empty($dopereg) ? $dopereg->name : null),
                ["class" => 'form-control',"id" => "name","placeholder" => "Enter your Name","required"]
            )}}
        </div> <!-- end form-group -->

            <div class="form-group">
                {{ Form::label("sex",'Sex?') }}
                <br/>
                {{ Form::label('Male') }}
                {{Form::radio('sex', 1,false)}}
                {{ Form::label('Female') }}
                {{Form::radio('sex', 0,false)}}
            </div> <!-- end form-group -->

        <div class="form-group">
            {{ Form::label('address',"Address" ) }}
            {{ Form::text('address',
                old('address') ? old('address') : (!empty($dopereg) ? $dopereg->address : null),
                ["class" => 'form-control',"id" => "address","placeholder" => "Enter your Address","required"]) }}
        </div> <!-- end form-group -->

        <div class="form-group">
            {{ Form::label('district',"District" ) }}
            {{ Form::select('district', $districts,
                old('district') ? old('district') : (!empty($dopereg) ? $dopereg->district : null),
                ["class" => 'form-control',"id" => "district","placeholder" => "Enter your District"]) }}
        </div> <!-- end form-group -->

        @include('backend/dope_reg/thana')

{{--        <div class="form-group">--}}
{{--            {{ Form::label('thana',"Thana" ) }}--}}
{{--            {{ Form::select('thana',$pStations,--}}
{{--                old('thana') ? old('thana') : (!empty($dopereg) ? $dopereg->thana : null),--}}
{{--                ["class" => 'form-control',"id" => "thana","placeholder" => "Enter your Police Station"]) }}--}}
{{--        </div> <!-- end form-group -->--}}
        </div>

            <div class="col-md-4">
            <div class="form-group">
                {{ Form::label('contact_no',"Contact No" ) }}
                {{ Form::text('contact_no',
                    old('contact_no') ? old('contact_no') : (!empty($dopereg) ? $dopereg->contact_no : null),
                    ["class" => 'form-control',"id" => "contact_no","placeholder" => "Enter your Mobile No","required"]) }}
            </div> <!-- end form-group -->

            <div class="form-group">
                <br>
                {{ Form::label("image", 'Image')}}
                {{Form::file('image', null,
                        ['class' => 'form-control','id' => 'image', 'required']
                )}}
            </div> <!-- end form-group -->

            @if($formType == 'edit')
                <div class="form-group d-flex flex-column">
                    <img src='{{asset("backend-lib/images/patient/$dopereg->image")}}' alt="" width="100px" height="100px">
                </div> <!-- end form-group -->
            @endif


        <div class="form-group">
            {{ Form::label('dob', "Date of Birth" ) }}
            <br/>
            {{ Form::text('dob',
                old('dob') ? old('dob') : (!empty($dopereg->dob) ? date('d-m-Y',strtotime($dopereg->dob))  : date('d-m-Y', strtotime(\Carbon\Carbon::now(+6))) ),
                ["class" => 'form-control',"id" => "dob", "required"]) }}
        </div> <!-- end form-group -->

        <div class="form-group">
            {{ Form::label('age',"Age" ) }}
            {{ Form::text('age',
                old('age') ? old('age') : (!empty($dopereg) ? $dopereg->age : null),
                ["class" => 'form-control',"id" => "age","placeholder" => "Enter your Age","required"]) }}
        </div> <!-- end form-group -->

        <div class="form-group">
        {{ Form::label('nid',"Nid No" ) }}
        {{ Form::text('nid',
            old('nid') ? old('nid') : (!empty($dopereg) ? $dopereg->nid : null),
            ["class" => 'form-control',"id" => "nid","placeholder" => "Enter your Nid No"]) }}
        </div> <!-- end form-group -->

       <div class="form-group">
           {{ Form::label("collection_type",'Collection Type') }}
           <br/>
           {{Form::radio('collection_type','General',false)}}
           {{ Form::label('General') }}
           {{Form::radio('collection_type', 'Home',false)}}
           {{ Form::label('Home') }}
           {{Form::radio('collection_type', 'Hospital',false)}}
           {{ Form::label('Hospital') }}
       </div> <!-- end form-group -->


        <div class="form-group">
        {{ Form::label('reference',"Reference" ) }}
        {{ Form::text('reference',
            old('reference') ? old('reference') : (!empty($dopereg) ? $dopereg->reference : null),
            ["class" => 'form-control',"id" => "reference","placeholder" => "Enter your Reference"]) }}
        </div> <!-- end form-group -->
        </div>

            <div class="col-md-4">
            <div class="form-group">
                {{ Form::label('reg_fee',"Reg Fee" ) }}
                {{ Form::text('reg_fee',
                    old('reg_fee') ? old('reg_fee') : (!empty($dopereg) ? $dopereg->reg_fee : null),
                    ["class" => 'form-control',"id" => "reg_fee","placeholder" => "Enter your Reg Fee"]) }}
            </div> <!-- end form-group -->

            <div class="form-group">
                {{ Form::label('discount',"Discount" ) }}
                {{ Form::text('discount',
                    old('discount') ? old('discount') : (!empty($dopereg) ? $dopereg->discount : null),
                    ["class" => 'form-control',"id" => "discount","placeholder" => "Enter your Discount"]) }}
            </div> <!-- end form-group -->

            <div class="form-group">
                {{ Form::label('total',"Total" ) }}
                {{ Form::text('total',
                    old('total') ? old('total') : (!empty($dopereg) ? $dopereg->total : null),
                    ["class" => 'form-control',"id" => "total","placeholder" => "Total Amount"]) }}
            </div> <!-- end form-group -->

            <div class="form-group">
                {{ Form::label('paid',"Paid" ) }}
                {{ Form::text('paid',
                    old('paid') ? old('paid') : (!empty($dopereg) ? $dopereg->paid : null),
                    ["class" => 'form-control',"id" => "paid","placeholder" => "Paid Amount"]) }}
            </div> <!-- end form-group -->

            <div class="form-group">
                {{ Form::label("payment_type",'Payment Type') }}
                <br/>
                {{Form::radio('payment_type','Cash',false)}}
                {{ Form::label('Cash') }}
                {{Form::radio('payment_type','Card',false)}}
                {{ Form::label('Card') }}
                <br/>
                {{Form::radio('payment_type','Cheque',false)}}
                {{ Form::label('Cheque') }}
                {{Form::radio('payment_type','Mobile Banking',false)}}
                {{ Form::label('Mobile Banking') }}
            </div> <!-- end form-group -->

            <div class="form-group">
                {{ Form::label("account_head", 'Account Head')}}
                {{Form::select('account_head',['Cash in Hand'=> "Cash in Hand",'Bkash'=>"Bkash",'Rocket'=>"Rocket"], old('account_head') ? old('account_head') : (!empty($dopereg) ? $dopereg->account_head : null),
                        ['class' => 'form-control','id' => 'account_head','placeholder'=>'Select Account Head', ]
                )}}
            </div> <!-- end form-group -->
            </div>



                </div> <!-- end row -->
                    </div>
                        </div> <!-- end row -->

                        {{Form::submit('Submit', ['class'=>"btn btn-success"])}}
                        {!! Form::close() !!}

                            </div><!-- end body -->
                        </div> <!-- card -->
                    </div> <!-- end col-md-12 -->


    </div>


@endsection


@section('script')

    <!-- Extra JavaScript/CSS added manually in "Settings" tab -->
    <!-- Include jQuery -->
    <script type="text/javascript" src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
    <!-- Include Date Range Picker -->
    <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/js/bootstrap-datepicker.min.js"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.4.1/css/bootstrap-datepicker3.css"/>



    <!-- Javascript -->
    <script src="{{asset('Lib/js/jquery-min.js')}}"></script>
    <script src="{{asset('Lib/js/libscripts.bundle.js')}}"></script>
    <script src="{{asset('Lib/js/vendorscripts.bundle.js')}}"></script>
    <script src="{{asset('Lib/js/flotscripts.bundle.js')}}"></script>
    <script src="{{asset('Lib/js/c3.bundle.js')}}"></script>
    <script src="{{asset('Lib/js/knob.bundle.js')}}"></script>
    <script src="{{asset('Lib/js/mainscripts.bundle.js')}}"></script>
    <script src="{{asset('Lib/js/index11.js')}}"></script>





    <script>
        $(document).ready(function(){
            var date_input=$('input[name="reg_date"]'); //our date input has the name "date"
            var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
            date_input.datepicker({
                format: 'dd-mm-yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
            })
        })
    </script>

    <script>
        $(document).ready(function(){
            var date_input=$('input[name="dob"]'); //our date input has the name "date"
            var container=$('.bootstrap-iso form').length>0 ? $('.bootstrap-iso form').parent() : "body";
            date_input.datepicker({
                format: 'dd-mm-yyyy',
                container: container,
                todayHighlight: true,
                autoclose: true,
            })
        })
    </script>

@endsection

    @section('scripts')

        <script>
            $(document).ready(function(){
                $("#district_name").on('change', function () {
                    var district_name = this.value;
                    $.ajax({
                        'type' : 'get',
                        'url' : '{{url('thana_name')}}',
                        'data' : {district_name : district_name},
                        'data-type' : 'html',
                        success : function (response) {
                            $("#thana_id").html(response);
                            console.log(response);
                        }
                    });
                });

            });//document ready
        </script>

@endsection
