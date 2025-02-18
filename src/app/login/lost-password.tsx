export default function LostPasswordPage() {
  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Lost Password</h1>
      <p className="text-gray-600 mb-6">
        Please enter your registered email address and click Submit. You will receive an email with a link to reset your password shortly.
      </p>

      <div className="space-y-6">
        {/* Email Input */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Account Information</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded-lg"
          />
        </div>

        {/* CAPTCHA Verification */}
        <div>
          <h2 className="text-lg font-semibold mb-2">CAPTCHA Verification</h2>
          <p className="text-gray-600 mb-2">
            Please enter the text you see in the image into the textbox below (we use this to prevent automated submissions).
          </p>
          <div className="flex items-center space-x-4">
            {/* CAPTCHA Image */}
            <div className="p-4 bg-gray-100 border rounded">
              <img src="/captcha-image.jpg" alt="CAPTCHA" />
            </div>
            {/* CAPTCHA Input */}
            <input
              type="text"
              placeholder="Enter CAPTCHA"
              className="flex-1 p-3 border rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button className="bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600">
          Submit
        </button>
      </div>
    </div>
  );
}
