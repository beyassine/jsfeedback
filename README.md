# **jsFeedback**

`jsFeedback` is a lightweight, customizable feedback modal plugin built with [Tingle.js](https://tingle.robinparisi.com/). It allows you to gather, analyze, and organize user feedback with ease.

## **Installation**

Install the plugin via npm:

```bash
npm install jsfeedback
```
Import it into your project

```js
import FeedbackModal from 'jsfeedback';
```
## **API Key**

Get your API Key from dashboard

## **Usage**

Basic (VanillaJS) Example
 
```bash
import FeedbackModal from 'jsfeedback';

const feedbackModal = new FeedbackModal({
    submitUrl: 'https://example.com/api/feedback',
    apiKey: 'your-api-key',
    title: 'We Value Your Feedback!',
    description: 'Please let us know how we can improve.',
    onSuccess: (response) =>  console.log('Successful!',resonse),
    onError: (error) =>  console.log('Eroor',error),
});

// Open the modal on button click
document.getElementById('feedback-button').addEventListener('click', () => {
    feedbackModal.open();
});

```
ReactJS Example

```jsx
import React from 'react';
import FeedbackModal from 'jsfeedback';

const App = () => {
    const feedbackModal = React.useRef(null);

    React.useEffect(() => {
        feedbackModal.current = new FeedbackModal({
            submitUrl: 'https://example.com/api/feedback',
            apiKey: 'your-api-key',
            title: 'We Value Your Feedback!',
            description: 'Please let us know how we can improve.',
            onSuccess: (response) => console.log('Successful!',resonse),
            onError: (error) => console.log('Failed.',error),
        });
    }, []);

    const openModal = () => {
        feedbackModal.current.open();
    };

    return (
        <div>
            <button onClick={openModal}>Give Feedback</button>
        </div>
    );
};

export default App;
```

## **Options**

| Option      | Type      | Description                                         | Required |
|-------------|-----------|-----------------------------------------------------|----------|
| submitUrl   | string    | URL where the feedback will be submitted.           | Yes      |
| apiKey      | string    | API key for authentication.                         | Yes      |
| title       | string    | Title of the feedback modal.                        | No       |
| description | string    | Description of the feedback modal.                  | No       |
| onSuccess   | function  | Callback invoked on successful form submission.     | No       |
| onError     | function  | Callback invoked if the form submission fails.      | No       |

## **Methods**

| Method      | Description                     |
|-------------|---------------------------------|
| open()      | Opens the feedback modal        |
| close()     | Closes the feedback modal       |


