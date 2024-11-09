// src/app/terms-and-services.tsx

import React from 'react';

const TermsAndServices: React.FC = () => {
  return (
    <div className="max-w-lg mx-auto p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-center mb-6">Terms</h1>
      
      {/* Last Update Date */}
      <p className="text-sm text-gray-500 text-center mb-6">Last update: 25/6/2024</p>

      {/* Terms Content */}
      <p className="text-base mb-6">
        LuxeStay provides an online platform connecting hosts who have accommodations to rent with guests seeking to book such accommodations.
      </p>

      {/* Conditions of Uses Section */}
      <h2 className="text-lg font-semibold text-blue-500 mb-2">Conditions of Uses</h2>

      <p className="text-base">
        As a host, you must ensure that your property and hosting activities are compliant with all relevant laws, regulations, and ordinances. This includes, but is not limited to:
      </p>
      
      <ul className="list-disc list-inside mt-2 mb-6 space-y-2">
        <li>Obtaining any necessary permits or licenses required to operate a short-term rental in your locality.</li>
        <li>Ensuring that your property meets all health and safety standards, such as fire alarms, carbon monoxide detectors, and other required safety features.</li>
        <li>
          Staying aware of any tax obligations that may arise from rental income. LuxeStay does not provide tax advice, and it is the responsibility of the host to comply with local tax laws, including registering with local tax authorities and reporting income as required.
        </li>
      </ul>
    </div>
  );
};

export default TermsAndServices;
