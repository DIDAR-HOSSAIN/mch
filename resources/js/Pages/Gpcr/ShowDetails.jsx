import React from 'react';

const ShowDetails = ({gpcr}) => {
    return (
        <div className="gpcr-details-container">
        <h2>{gpcr.name}</h2>
        <p><strong>Email:</strong> {gpcr.email || 'N/A'}</p>
        <p><strong>Date of Birth:</strong> {gpcr.dob}</p>
        <p><strong>Age:</strong> {gpcr.age}</p>
        <p><strong>Sex:</strong> {gpcr.sex}</p>
        <p><strong>Address:</strong> {gpcr.address}</p>
        <p><strong>Contact No:</strong> {gpcr.contact_no}</p>
        <p><strong>Passport No:</strong> {gpcr.passport_no || 'N/A'}</p>
        <p><strong>Police Station:</strong> {gpcr.police_station || 'N/A'}</p>
        <p><strong>District:</strong> {gpcr.district || 'N/A'}</p>
        <p><strong>Registration Fee:</strong> {gpcr.reg_fee}</p>
        <p><strong>Discount:</strong> {gpcr.discount || 'N/A'}</p>
        <p><strong>Paid:</strong> {gpcr.paid}</p>
        <p><strong>Due:</strong> {gpcr.due}</p>
        <p><strong>Total:</strong> {gpcr.total}</p>
        <p><strong>Discount Reference:</strong> {gpcr.discount_reference || 'N/A'}</p>
        <p><strong>Vaccine Name:</strong> {gpcr.vaccine_name || 'N/A'}</p>
        <p><strong>Vaccine Certificate No:</strong> {gpcr.vaccine_certificate_no || 'N/A'}</p>
        <p><strong>First Dose Date:</strong> {gpcr.first_dose_date || 'N/A'}</p>
        <p><strong>Second Dose Date:</strong> {gpcr.second_dose_date || 'N/A'}</p>
        <p><strong>Booster Dose Date:</strong> {gpcr.booster_dose_date || 'N/A'}</p>
        <p><strong>Contact No Relation:</strong> {gpcr.contact_no_relation || 'N/A'}</p>
        <p><strong>Test Type:</strong> {gpcr.test_type}</p>
        <p><strong>Entry Date:</strong> {gpcr.entry_date}</p>
        <p><strong>Sample Collected By:</strong> {gpcr.sample_collected_by || 'N/A'}</p>
        <p><strong>Hospital Name:</strong> {gpcr.hospital_name || 'N/A'}</p>
        <p><strong>Ticket No:</strong> {gpcr.ticket_no || 'N/A'}</p>
        <p><strong>Payment Type:</strong> {gpcr.payment_type}</p>
        <p><strong>Account Head:</strong> {gpcr.account_head}</p>
        <p><strong>NID:</strong> {gpcr.nid || 'N/A'}</p>
        <p><strong>User Name:</strong> {gpcr.user_name}</p>
      </div>
    );
};

export default ShowDetails;