//I came up with this 03/21/24
const ContactUsSchema = new mongoose.Schema({
    fullname: {
        type: String,
        trim: true,
        required: true
    },
    email: {
        type: String,
        trim: true,
        required: true
    },
    phone: {
        type: String,
        trim: true
    },
    company_name: {
        type: String,
        trim: true
    },
    project_name: {
        type: String,
        trim: true
    },
    project_desc: {
        type: String,
        trim: true
    },
    department: {
        type: String,
        trim: true
    },
    message: {
        type: String,
        trim: true,
        required: true
    },
    file: {
        type: String, // Change to appropriate type for file storage
        trim: true
    }
}, { timestamps: true });
