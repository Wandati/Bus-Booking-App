# BusTrack Website

## Authors:

  1. [Marvin Kinyanjui](https://github.com/Wandati)
  2. [Cliff Kamau](https://github.com/clyfe-008)
  3. [Steve Kariuki](https://github.com/NoobStevie)

## Project Description

Welcome to our BusTrack App. This app allows users to search and book bus tickets conveniently. 
The app is built using Flask for the backend and React for the frontend, providing a seamless and responsive user experience.

## Features

- **User Authentication:** Users can create accounts, log in and log out securely. User passwords are encrypted for enhanced security.

- **Search:** Users can search for buses based on various criteria such as source, destination, date, and bus operator.

- **Seat Selection:** Users can view available seats on buses and select their preferred seats during the booking process.

- **Booking Management:** Users can view their booking history, cancel bookings, and receive booking confirmation emails.

- **Payment Integration:** Secure payment gateways are integrated to facilitate online payments for bookings.

- **Responsive Design:** The application is designed to be responsive and works seamlessly on desktops, tablets and mobile devices.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js and npm:** Install Node.js and npm to run the frontend application. You can download and install them from [nodejs.org](https://nodejs.org/.).

- **Python:** Install Python to run the Flask backend. You can download and install Python from [python.org](https://www.python.org/.).

- **Virtual Environment (Optional):** It is recommended to set up a virtual environment for the Flask backend. You can install 'virtualenv' using 'pip install virtualenv'.


## Installation

  1. Clone the repository:
  
    '''
    
    git clone https://github.com/Wandati/Flask-Bus-Booking-App

    '''

  2. Navigate to the project directory:

    '''

    cd Flask-Bus-Booking-App

    '''

  3. Install frontend dependencies:

    '''

    cd client
    npm install

    '''

  4. Install backend dependencies:

    '''

    cd server

    '''

    # If using virtual environment (recommended)

    virtualenv venv
    source venv/bin/activate # On Windows, use venv\Scripts\activate

    # Install Flask and other backend dependencies

    pip install -r requirements.txt

    '''

## Configuration

   Configure the backend:

  - Create a '.env' file in the project directory for storing environmnent variables.

  The backend will be hosted at:

  https://bus-tracker.onrender.com/


## Usage

1. Start the React frontend (inside the 'client' directory):

  '''

  npm start

  '''

  The React app will run at 'http://localhost:3000'.

2. Open your browser and access 'http://localhost:3000' to use the BusTrack App.
    

## Programming Languages Used
  1. JavaScript(React)🤖
  2. Python🤖
  3. CSS(Bootstrap)🤖


## Contributing

Contributions are welcome!

Please follow these steps to contribute to the project:

  1. Fork the repository
  2. Create a new branch for your feature or bug fix: 'git checkout -b feature-name'.
  3. Make your changes and commit them: 'git commit -m "Description of your changes"'.
  4. Push your changes to the branch: 'git push origin feature-name'.
  5. Create a pull request detailing your changes.





## License

Copyright (c) Marvin Wandati
Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Thank you for using our BusTrack App! If you have any questions or issues, please feel free to reach out.
Happy Booking! 🚌✨

