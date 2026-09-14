const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());


// =====================================================
// MONGODB CONNECTION
// =====================================================

mongoose
  .connect("mongodb://127.0.0.1:27017/trainingdb")
  .then(() => {
    console.log("MongoDB Connected Successfully");
  })
  .catch((error) => {
    console.log("MongoDB Connection Error:", error);
  });
  //Dashboard api
  app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const patients = await Patient.countDocuments();
    const doctors = await Doctors.countDocuments();
    const appointments = await Appointment.countDocuments();
    const medicines = await Medicine.countDocuments();
    const departments = await Department.countDocuments();
    const laboratory = await Laboratory.countDocuments();
    const billing = await Billing.countDocuments();

    res.status(200).json({
      success: true,
      patients,
      doctors,
      appointments,
      medicines,
      departments,
      laboratory,
      billing,
      availableBeds: 45,
    });
  } catch (error) {
    console.log("Dashboard API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard statistics",
      error: error.message,
    });
  }
});
// =====================================================
// PATIENT MODEL
// =====================================================

const Patient = mongoose.model(
  "Patient",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      disease: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: "patients",
    }
  )
);


// =====================================================
// DOCTOR MODEL
// =====================================================

const Doctors = mongoose.model(
  "Doctors",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      specialization: {
        type: String,
        required: true,
      },

      fees: {
        type: Number,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: "doctors",
    }
  )
);


// =====================================================
// APPOINTMENT MODEL
// =====================================================

const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema(
    {
      patientname: {
        type: String,
        required: true,
      },

      doctorname: {
        type: String,
        required: true,
      },

      appointmentdate: {
        type: String,
        required: true,
      },

      appointmenttime: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: "appointments",
    }
  )
);


// =====================================================
// MEDICINE MODEL
// =====================================================

const Medicine = mongoose.model(
  "Medicine",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      company: {
        type: String,
        required: true,
      },

      category: {
        type: String,
        required: true,
      },

      price: {
        type: Number,
        required: true,
      },

      stock: {
        type: Number,
        required: true,
      },

      expiryDate: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: "medicines",
    }
  )
);


// =====================================================
// BILLING MODEL
// =====================================================
const billingSchema = new mongoose.Schema(
  {
    patientname: {
      type: String,
      required: true,
      trim: true
    },

    doctorname: {
      type: String,
      required: true,
      trim: true
    },

    treatementservice: {
      type: String,
      required: true,
      trim: true
    },

    amount: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    timestamps: true
  }
);
const Billing = mongoose.model("Billing", billingSchema);

// =====================================================
// DEPARTMENT MODEL
// =====================================================

const Department = mongoose.model(
  "Department",
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      description: {
        type: String,
        required: true,
      },

      doctor: {
        type: String,
        required: true,
      },

      status: {
        type: String,
        default: "Active",
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: "departments",
    }
  )
);


// =====================================================
// LABORATORY MODEL
// =====================================================

const Laboratory = mongoose.model(
  "Laboratory",
  new mongoose.Schema(
    {
      patientname: {
        type: String,
        required: true,
      },

      testname: {
        type: String,
        required: true,
      },

      result: {
        type: String,
        required: true,
      },

      amount: {
        type: Number,
        required: true,
      },

      status: {
        type: String,
        default: "Pending",
      },

      testdate: {
        type: String,
        required: true,
      },

      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    {
      collection: "laboratory",
    }
  )
);


// =====================================================
// HOME API
// =====================================================

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hospital Management System API Running",
  });
});


// =====================================================
//                    PATIENT APIs
// =====================================================

// GET ALL PATIENTS

app.get("/api/patients", async (req, res) => {
  try {
    const patients = await Patient.find().sort({
      createdAt: -1,
    });

    res.status(200).json(patients);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// POST PATIENT

app.post("/api/patients", async (req, res) => {
  try {

    const {
      name,
      disease,
      phone,
    } = req.body;

    if (!name || !disease || !phone) {
      return res.status(400).json({
        success: false,
        message: "Please fill all patient fields",
      });
    }

    const patient = await Patient.create({
      name,
      disease,
      phone,
    });

    res.status(201).json({
      success: true,
      message: "Patient added successfully",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// PUT PATIENT

app.put("/api/patients/:id", async (req, res) => {
  try {

    const {
      name,
      disease,
      phone,
    } = req.body;

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        name,
        disease,
        phone,
      },
      {
        new: true,
      }
    );

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient updated successfully",
      patient,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// DELETE PATIENT

app.delete("/api/patients/:id", async (req, res) => {
  try {

    const patient =
      await Patient.findByIdAndDelete(req.params.id);

    if (!patient) {
      return res.status(404).json({
        success: false,
        message: "Patient not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Patient deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// =====================================================
//                    DOCTOR APIs
// =====================================================

// GET DOCTORS

app.get("/api/doctors", async (req, res) => {
  try {

    const doctors = await Doctors.find().sort({
      createdAt: -1,
    });

    res.status(200).json(doctors);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// POST DOCTOR

app.post("/api/doctors", async (req, res) => {
  try {

    const {
      name,
      specialization,
      fees,
    } = req.body;

    if (!name || !specialization || !fees) {
      return res.status(400).json({
        success: false,
        message: "Please fill all doctor fields",
      });
    }

    const doctor = await Doctors.create({
      name,
      specialization,
      fees,
    });

    res.status(201).json({
      success: true,
      message: "Doctor added successfully",
      doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// PUT DOCTOR

app.put("/api/doctors/:id", async (req, res) => {
  try {

    const {
      name,
      specialization,
      fees,
    } = req.body;

    const doctor =
      await Doctors.findByIdAndUpdate(
        req.params.id,
        {
          name,
          specialization,
          fees,
        },
        {
          new: true,
        }
      );

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      doctor,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// DELETE DOCTOR

app.delete("/api/doctors/:id", async (req, res) => {
  try {

    const doctor =
      await Doctors.findByIdAndDelete(req.params.id);

    if (!doctor) {
      return res.status(404).json({
        success: false,
        message: "Doctor not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// =====================================================
//                 APPOINTMENT APIs
// =====================================================

// GET APPOINTMENTS

app.get("/api/appointment", async (req, res) => {
  try {

    const appointments =
      await Appointment.find().sort({
        createdAt: -1,
      });

    res.status(200).json(appointments);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// POST APPOINTMENt

// ===============================
// POST APPOINTMENT
// ===============================
app.post("/api/appointment", async (req, res) => {
  try {
    const {
      patientname,
      doctorname,
      appointmentdate,
      appointmenttime,
    } = req.body;

    if (
      !patientname ||
      !doctorname ||
      !appointmentdate ||
      !appointmenttime
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all appointment fields",
      });
    }

    const appointment = await Appointment.create({
      patientname: patientname.trim(),
      doctorname: doctorname.trim(),
      appointmentdate: String(appointmentdate),
      appointmenttime: String(appointmenttime),
      createdAt: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Appointment booked successfully",
      appointment,
    });

  } catch (error) {
    console.log("POST APPOINTMENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


// PUT APPOINTMENT

app.put("/api/appointment/:id", async (req, res) => {
  try {

    const {
      patientname,
      doctorname,
      appointmentdate,
      appointmenttime,
    } = req.body;

    const appointment =
      await Appointment.findByIdAndUpdate(
        req.params.id,
        {
          patientname,
          doctorname,
          appointmentdate,
          appointmenttime,
        },
        {
          new: true,
        }
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment updated successfully",
      appointment,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// DELETE APPOINTMENT

app.delete("/api/appointment/:id", async (req, res) => {
  try {

    const appointment =
      await Appointment.findByIdAndDelete(
        req.params.id
      );

    if (!appointment) {
      return res.status(404).json({
        success: false,
        message: "Appointment not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointment deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// =====================================================
//                  MEDICINE APIs
// =====================================================

// GET MEDICINES

app.get("/api/medicines", async (req, res) => {
  try {

    const medicines =
      await Medicine.find().sort({
        createdAt: -1,
      });

    res.status(200).json(medicines);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// POST MEDICINE

app.post("/api/medicines", async (req, res) => {
  try {

    const {
      name,
      company,
      category,
      price,
      stock,
      expiryDate,
    } = req.body;

    const medicine =
      await Medicine.create({
        name,
        company,
        category,
        price,
        stock,
        expiryDate,
      });

    res.status(201).json({
      success: true,
      message: "Medicine added successfully",
      medicine,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// PUT MEDICINE

app.put("/api/medicines/:id", async (req, res) => {
  try {

    const medicine =
      await Medicine.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine updated successfully",
      medicine,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// DELETE MEDICINE

app.delete("/api/medicines/:id", async (req, res) => {
  try {

    const medicine =
      await Medicine.findByIdAndDelete(
        req.params.id
      );

    if (!medicine) {
      return res.status(404).json({
        success: false,
        message: "Medicine not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Medicine deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// =====================================================
//                     BILLING APIs
// =====================================================


// Billing get api
app.get("/api/Billing", async (req, res) => {
  try {
    const bills = await Billing.find().sort({ createdAt: -1 });

    res.status(200).json(bills);
  } catch (error) {
    console.error("Billing GET Error:", error);

    res.status(500).json({
      message: "Failed to fetch billing records",
      error: error.message
    });
  }
});


// Billing Post api
app.post("/api/Billing", async (req, res) => {
  try {
    console.log("BILL DATA:", req.body);

    const {
      patientname,
      doctorname,
      treatementservice,
      amount
    } = req.body;

    if (
      !patientname ||
      !doctorname ||
      !treatementservice ||
      amount === undefined ||
      amount === ""
    ) {
      return res.status(400).json({
        message: "All billing fields are required"
      });
    }

    const newBill = new Billing({
      patientname: patientname,
      doctorname: doctorname,
      treatementservice: treatementservice,
      amount: Number(amount)
    });

    const savedBill = await newBill.save();

    res.status(201).json({
      message: "Bill created successfully",
      bill: savedBill
    });

  } catch (error) {
    console.log("BILL POST ERROR:", error);

    res.status(500).json({
      message: "Failed to create bill",
      error: error.message
    });
  }
});

// Billing Put api
app.put("/api/Billing/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const {
      patientname,
      doctorname,
      treatementservice,
      amount
    } = req.body;

    // Validation
    if (
      !patientname ||
      !doctorname ||
      !treatementservice ||
      amount === undefined ||
      amount === ""
    ) {
      return res.status(400).json({
        message: "All billing fields are required"
      });
    }

    const updatedBill = await Billing.findByIdAndUpdate(
      id,
      {
        patientname,
        doctorname,
        treatementservice,
        amount: Number(amount)
      },
      {
        new: true,
        runValidators: true
      }
    );

    // Bill not found
    if (!updatedBill) {
      return res.status(404).json({
        message: "Billing record not found"
      });
    }

    res.status(200).json({
      message: "Billing record updated successfully",
      bill: updatedBill
    });

  } catch (error) {
    console.error("Billing PUT Error:", error);

    res.status(500).json({
      message: "Failed to update billing record",
      error: error.message
    });
  }
});


//Billing delete api
app.delete("/api/Billing/:id", async (req, res) => {
  try {
    const id = req.params.id;

    console.log("Deleting Bill ID:", id);

    const bill = await Billing.findById(id);

    if (!bill) {
      return res.status(404).json({
        message: "Billing record not found"
      });
    }

    await Billing.findByIdAndDelete(id);

    res.status(200).json({
      message: "Billing deleted successfully"
    });

  } catch (error) {
    console.error("DELETE BILL ERROR:", error);

    res.status(500).json({
      message: "Delete failed",
      error: error.message
    });
  }
});



// =====================================================
//                  DEPARTMENT APIs
// =====================================================

// GET DEPARTMENTS

app.get("/api/departments", async (req, res) => {
  try {

    const departments =
      await Department.find().sort({
        createdAt: -1,
      });

    res.status(200).json(departments);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// POST DEPARTMENT

app.post("/api/departments", async (req, res) => {
  try {

    const {
      name,
      description,
      doctor,
      status,
    } = req.body;

    const department =
      await Department.create({
        name,
        description,
        doctor,
        status: status || "Active",
      });

    res.status(201).json({
      success: true,
      message: "Department added successfully",
      department,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// PUT DEPARTMENT

app.put("/api/departments/:id", async (req, res) => {
  try {

    const department =
      await Department.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      department,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// DELETE DEPARTMENT

app.delete("/api/departments/:id", async (req, res) => {
  try {

    const department =
      await Department.findByIdAndDelete(
        req.params.id
      );

    if (!department) {
      return res.status(404).json({
        success: false,
        message: "Department not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// =====================================================
//                  LABORATORY APIs
// =====================================================

// GET LAB TESTS

app.get("/api/laboratory", async (req, res) => {
  try {

    const tests =
      await Laboratory.find().sort({
        createdAt: -1,
      });

    res.status(200).json(tests);

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// POST LAB TEST

app.post("/api/laboratory", async (req, res) => {
  try {

    const {
      patientname,
      testname,
      result,
      amount,
      status,
      testdate,
    } = req.body;

    const test =
      await Laboratory.create({
        patientname,
        testname,
        result,
        amount,
        status: status || "Pending",
        testdate,
      });

    res.status(201).json({
      success: true,
      message: "Lab test added successfully",
      test,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// PUT LAB TEST

app.put("/api/laboratory/:id", async (req, res) => {
  try {

    const test =
      await Laboratory.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        }
      );

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab test updated successfully",
      test,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});


// DELETE LAB TEST

app.delete("/api/laboratory/:id", async (req, res) => {
  try {

    const test =
      await Laboratory.findByIdAndDelete(
        req.params.id
      );

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Lab test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Lab test deleted successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
});
// =====================================================
//                 DASHBOARD API
// =====================================================

app.get("/api/dashboard/stats", async (req, res) => {
  try {
    const patients = await Patient.countDocuments();

    const doctors = await Doctors.countDocuments();

    const appointments = await Appointment.countDocuments();

    res.status(200).json({
      success: true,
      patients: patients,
      doctors: doctors,
      appointments: appointments,
      availableBeds: 45
    });

  } catch (error) {
    console.log("Dashboard API Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to load dashboard data",
      error: error.message
    });
  }
});


// =====================================================
//                  DASHBOARD API
// =====================================================

app.get("/api/dashboard/stats", async (req, res) => {
  try {

    const patients =
      await Patient.countDocuments();

    const doctors =
      await Doctors.countDocuments();

    const appointments =
      await Appointment.countDocuments();

    const medicines =
      await Medicine.countDocuments();

    const departments =
      await Department.countDocuments();

    const laboratory =
      await Laboratory.countDocuments();

    const billing =
      await Billing.countDocuments();

    res.status(200).json({

      success: true,

      patients: patients,

      doctors: doctors,

      appointments: appointments,

      medicines: medicines,

      departments: departments,

      laboratory: laboratory,

      billing: billing,

      availableBeds: 45,

    });

  } catch (error) {

    console.log(
      "Dashboard API Error:",
      error
    );

    res.status(500).json({

      success: false,

      message:
        "Failed to load dashboard statistics",

      error: error.message,

    });

  }
});


// =====================================================
//                    START SERVER
// =====================================================

const PORT = 5000;

app.listen(PORT, () => {

  console.log(
    `Server running on http://localhost:${PORT}`
  );

});