import tingle from 'tingle.js';
import axios from 'axios';

export default class FeedbackModal {
    constructor(options = {}) {
        const {
            submitUrl, // URL to submit the form data
            apiKey,// API Key
            title, // Modal title
            description, // Modal description
            onSuccess, // Callback for successful form submission
            onError,   // Callback for form submission errors
        } = options;

        this.submitUrl = submitUrl || ''; // Endpoint URL
        this.apiKey = apiKey || ''; // Api Key
        this.title = title || ''; // Title
        this.description = description || ''; // Description
        this.onSuccess = onSuccess || ((response) => console.log('Success:', response)); // Success Callback Function
        this.onError = onError || ((error) => console.log('Error:', error)); // Error Callback Function

        this.modal = new tingle.modal({
            cssClass: ['feedback-modal', ...(options.cssClass || [])],
            closeMethods: [], // Disable default close button
        });

        this._injectStyles();
        this.modal.setContent(this._buildForm());
    }

    _injectStyles() {
        const styles = `  
            /* Ensure the modal overlay covers the whole viewport */
            .tingle-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background-color: rgba(0, 0, 0, 0.1); /* Black with 80% opacity */
                z-index: 1000; /* Ensure it appears above other elements */
                display: flex;
                align-items: center;
                justify-content: center;
            }

            /* Disable scroll on the body when the modal is open */
            body.tingle-enabled {
                overflow: hidden;
            }
                
            /* Modal Styling*/
            .feedback-modal .tingle-modal-box {
                background-color: white;
                border-radius: 12px;
                border: 1px solid #5c5c5c;
                padding: 25px;
                max-width: 400px;
                margin: auto;
                font-family: 'Inter', sans-serif;
                box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
                position: relative;
            }
            
            /* Title and Close Button Wrapper */
            .feedback-form-header {                
                padding-left,padding-right: 5px;    
                display: flex;
                justify-content: space-between;
                align-items: center;
            }

            /* Title Styling */
            .feedback-form-header h2 {
                font-family: 'Inter', sans-serif;
                font-size: 20px;
                color: #333;
                margin: 0;
            }
            /* Title Styling */
            .feedback-form-header h1 {
                font-family: 'Inter', sans-serif;
                font-size: 30px;
                color: #333;
                margin: 0;
            }
            .modal-description {
                font-family: 'Arial', sans-serif;
                font-size: 16px;
                color: #333;
                padding:5px;
                
            }
            /* Close Button */
            .feedback-form-header .close-button {
                background: none;
                border: none;
                font-size: 20px;
                font-weight: bold;
                color: #555;
                cursor: pointer;
                margin: 0;
                padding: 0;
            }

            /* Form Styling */
            .feedback-form {
                padding-right,padding-left: 5px;
                background-color: white;
                border-radius: 8px;
            }

            .feedback-form label {
                display: block;
                margin-bottom: 8px;
                font-weight: 600;
                color: #555;
                font-size: 14px;
            }

            .feedback-form textarea,
            .feedback-form input {
                width: 100%;
                padding: 12px;
                margin-bottom: 15px;
                border: 1px solid #ccc;
                border-radius: 8px;
                font-size: 16px;
                font-family: 'Inter', sans-serif;  
            }

            .feedback-form textarea{
                height:100px;
            
            }
            .feedback-form textarea:focus{                          
                outline: 1px solid #5c5c5c;
                height:100px;
            
            }
            .feedback-form input:focus {             
                outline: 1px solid #5c5c5c;
            }

            .feedback-form button {
                background-color: white; /* white color */
                color: black;
                border: 1px solid #5c5c5c;
                width: 100%; /* Full width */
                padding: 14px;
                cursor: pointer;
                border-radius: 8px;
                font-size: 18px;
                font-family: 'Inter', sans-serif;
                transition: background-color 0.3s ease;
            }


            .feedback-form .error {
                color: red;
                font-size: 14px;
                margin-bottom: 10px;
                text-align: center;
            }
        `;

        // Add Inter Font (inline font inclusion)
        const fontLink = document.createElement('link');
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600&display=swap';
        document.head.appendChild(fontLink);

        const styleSheet = document.createElement('style');
        styleSheet.type = 'text/css';
        styleSheet.innerText = styles;
        document.head.appendChild(styleSheet);
    }

    _buildForm() {
        const container = document.createElement('div');
        container.className = 'feedback-container';

        // Header (Title + Close Button)
        const header = document.createElement('div');
        header.className = 'feedback-form-header';

        const title = document.createElement('h2');
        title.textContent = this.title;


        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.innerHTML = '<h1>&times;</h1>'; // Close icon
        closeButton.addEventListener('click', () => this.modal.close());

        header.appendChild(title);
        header.appendChild(closeButton);

        // Append header to container
        container.appendChild(header);

        // Description under the title
        if (this.description) {
            const description = document.createElement('p');
            description.className = 'modal-description';
            description.textContent = this.description;
            container.appendChild(description);
        }

        // Form
        const form = document.createElement('form');
        form.className = 'feedback-form';

        // Feedback text area (required)
        const feedbackInput = document.createElement('textarea');
        feedbackInput.name = 'feedback';
        feedbackInput.id = 'feedback';
        feedbackInput.placeholder = 'Feedback';
        feedbackInput.required = true;

        form.appendChild(feedbackInput);

        // Email input (optional)
        const emailInput = document.createElement('input');
        emailInput.type = 'email';
        emailInput.name = 'email';
        emailInput.id = 'email';
        emailInput.placeholder = 'Email adress (Optional)';

        form.appendChild(emailInput);

        // Error message container
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error';
        form.appendChild(errorDiv);

        // Submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Send Feedback';

        form.appendChild(submitButton);

        // Form submission handler
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            errorDiv.textContent = ''; // Clear previous error messages

            submitButton.textContent = 'Sending ...';

            const formData = Object.fromEntries(new FormData(form).entries());
            const fd = {
                apiKey: this.apiKey,
                text: formData.feedback,
                email: formData.email,
            }

            try {
                const response = await axios.post(this.submitUrl, fd);
                submitButton.textContent = 'Send Feedback';
                // Call the onSuccess callback
                if (typeof this.onSuccess === 'function') {
                    this.onSuccess(response.data);
                }
                this.modal.close();
            } catch (error) {
                submitButton.textContent = 'Send Feedback';
                errorDiv.textContent = 'Failed to submit feedback. Please try again.';
            }
        });

        // Append form to container
        container.appendChild(form);

        return container;
    }

    open() {
        this.modal.open();
    }

    close() {
        this.modal.close();
    }
}
