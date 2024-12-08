# **jsFeedback**

`jsFeedback` is a lightweight, customizable feedback modal plugin built with [Tingle.js](https://tingle.robinparisi.com/) and [Axios](https://axios-http.com/). It allows you to gather user feedback with ease and send it to your server.

## **Installation**

Install the plugin via npm:

```bash
npm install jsfeedback
```
## **Usage**

 Vanilla JS Example
 
```bash
import FeedbackModal from 'jsfeedback';

const feedbackModal = new FeedbackModal({
    submitUrl: 'https://example.com/api/feedback',
    apiKey: 'your-api-key',
    title: 'We Value Your Feedback!',
    description: 'Please let us know how we can improve.',
    onSuccess: (response) => alert('Feedback submitted successfully!'),
    onError: (error) => alert('Failed to submit feedback.'),
});

// Open the modal on button click
document.getElementById('feedback-button').addEventListener('click', () => {
    feedbackModal.open();
});

```




