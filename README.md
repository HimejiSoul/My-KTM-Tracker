# My KTM Tracker

My KTM Tracker is an application for tracking KTM (Kartu Tanda Mahasiswa) and detecting possible KTM cloning using the secret key method. The application displays tap history and provides a feature to block the KTM on RFID readers. It utilizes the WebSocket API for real-time communication and utilizes Firestore as the database for storing data.

## Installation

Follow the steps below to run the My KTM Tracker application in your local environment:

1. Clone the repository.

   ```bash
   git clone https://github.com/username/my-ktm-tracker.git
   ```

2. Navigate to the project directory.

   ```bash
   cd my-ktm-tracker
   ```

3. Install all dependencies.

   ```bash
   npm install
   ```

4. Configure the application.
   - Open the `.env.example` file.
   - Create a copy of the file and name it `.env`.
   - Fill in the required configurations in the `.env` file, such as API keys and database credentials.

5. Run the application.

   ```bash
   npm start
   ```

6. The My KTM Tracker application is now running at `http://localhost:3000`.

## Usage

Once you have the application up and running, you can perform the following steps:

1. Sign up or log in with your user account.

2. Enter your KTM information, including the KTM number and the provided secret key from the institution.

3. The application will verify the KTM using the secret key and confirm its authenticity.

4. You can track the tap history, record transactions, and access activity reports of the KTM.

5. If KTM cloning or suspicious usage is detected, the application will provide notifications and preventive actions.

6. Explore other available features such as profile settings, user rankings, and help sections.

## API

The My KTM Tracker application utilizes the WebSocket API for real-time communication between the client and the server.

## Database

The application uses Firestore as the database for storing KTM data and tap history.

## Libraries Used

The following libraries are used in the My KTM Tracker application:

- AsyncStorage
- Firestore
- React Navigation
- @react-navigation/native-stack
- @react-navigation/bottom-tabs
- Moment
- @react-navigation/native

## Contribution

We welcome contributions from the community! If you would like to contribute to this project, please follow these steps:

1. Fork this repository.

2. Create a new branch for the feature you will add/modify.

   ```bash
   git checkout -b new-feature
   ```

3. Make the necessary changes and commit them.

   ```bash
   git commit -m "Add new feature"
   ```

4. Push to your branch in the forked repository.

   ```bash
   git push origin new-feature
   ```

5. Create a Pull Request from your branch in the forked repository to the `master` branch in the main repository.

6. We will review the Pull Request you created and provide feedback.

7. After your Pull Request is accepted, your changes will be merged into the project.

## License

Distributed under the MIT License. See [LICENSE](LICENSE) for more information.

## Contact

If you have any questions, suggestions, or issues regarding the My KTM Tracker application, please contact us at [email@example.com](mailto:email@example.com).
