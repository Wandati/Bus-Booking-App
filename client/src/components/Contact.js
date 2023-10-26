import React from 'react';

<<<<<<< HEAD
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
=======
function ContactUs() {
  return (
    <div>
      <h1>Contact Us</h1>
      <p>If you have any questions or feedback, please feel free to contact us:</p>

      <div>
        <strong>Email:</strong> <a href="kenyanhuan@gmail.com">huan@gmailcom</a>
      </div>

      <div>
        <strong>Phone:</strong> <a href="tel:+2547897653">+2547-456-789</a>
      </div>

      <div>
        <strong>Address:</strong> 111 Main Street, City, Country
      </div>

    </div>
  );
}

export default ContactUs;
>>>>>>> 13044bc7cb39512ceac9f613267c74e52ee52d78
