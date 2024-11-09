// components/FeatureList.tsx
import React from "react";

interface FeatureListProps {
  title: string;
  items: (string | number)[] | undefined;
  emptyMessage: string;
}

const FeatureList: React.FC<FeatureListProps> = ({
  title,
  items,
  emptyMessage,
}) => {
  return (
    <div className="my-6">
      <h2 className="text-xl font-semibold">{title}</h2>
      <ul className="mt-2">
        {Array.isArray(items) && items.length ? (
          items.map((item, index) => {
            if (typeof item === "string" || typeof item === "number") {
              return (
                <li key={index} className="text-gray-700">
                  {item}
                </li>
              );
            } else {
              return (
                <li key={index} className="text-gray-700">
                  No valid item
                </li>
              );
            }
          })
        ) : (
          <li className="text-gray-700">{emptyMessage}</li>
        )}
      </ul>
      <div className="my-6 border-b border-gray-300 opacity-50 w-5/6"></div>
    </div>
  );
};

export default FeatureList;
