import React from 'react';

const Contact = () => {
    return (
        <div className="container">
            <h1>Contact Us</h1>

            <p className="lead"> Do you have any questions or feedback? Don't hesitate to get in touch with us!</p>

            <form>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" />
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" className="form-control" id="email" />
                </div>

                <div className="mb-3">
                    <label htmlFor="message" className="form-label">Message</label>
                    <textarea className="form-control" id="message" rows="4"></textarea>
                </div>

                <button type ="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Contact;