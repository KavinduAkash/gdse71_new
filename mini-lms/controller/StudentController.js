import {students_db, courses_db} from "../db/db.js";
import StudentModel from "../model/StudentModel.js";

// load student records
function loadStudents() {
    $('#student-tbody').empty();
    students_db.map((item, index) => {
        let fname = item.fname;
        let lname = item.lname;
        let address = item.address;

        let data = `<tr>
                            <td>${index + 1}</td>
                            <td>${fname}</td>
                            <td>${lname}</td>
                            <td>${address}</td>
                        </tr>`

        $('#student-tbody').append(data);
    })
}

// save
$('#student_save').on('click', function(){
    // let fname = document.getElementById('fname').value;
    let fname = $('#fname').val();
    let lname = $('#lname').val();
    let address = $('#address').val();

    if(fname === '' || lname === '' || address === '') {
        // alert("Invalid inputs!");

        Swal.fire({
            title: 'Error!',
            text: 'Invalid Inputs',
            icon: 'error',
            confirmButtonText: 'Ok'
        })
    } else {


        // let student_data = {
        //     fname: fname,
        //     lname: lname,
        //     address: address
        // };

        let student_data = new StudentModel(fname, lname, address);

        students_db.push(student_data);

        console.log(students_db);

        loadStudents();

        // .push(), .pop(), .shift(), unshift()

        Swal.fire({
            title: "Added Successfully!",
            icon: "success",
            draggable: true
        });
    }
});

$("#student-tbody").on('click', 'tr', function(){
    let idx = $(this).index();
    console.log(idx);
    let obj = students_db[idx];
    console.log(obj);

    let fname = obj.fname;
    let lname = obj.lname;
    let address = obj.address;

    $("#fname").val(fname);
    $("#lname").val(lname);
    $("#address").val(address);
});