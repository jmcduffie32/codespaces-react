import { useState } from "react";
import { BuyInConfig } from "../interfaces/BuyInConfig";
import { ArrowDownIcon, ArrowUpIcon } from "@heroicons/react/24/outline"

function BuyIn({
  config,
  onConfigUpdate,
}: {
  config: BuyInConfig;
  onConfigUpdate: (config: BuyInConfig) => void;
}) {
  const [actionBuyIn, setActionBuyIn] = useState(config.actionBuyIn);
  const [ctpBuyIn, setCtpBuyIn] = useState(config.ctpBuyIn);
  const [bountyBuyIn, setBountyBuyIn] = useState(config.bountyBuyIn);
  const [aceBuyIn, setAceBuyIn] = useState(config.aceBuyIn);
  const [otherBuyIn, setOtherBuyIn] = useState(config.otherBuyIn);

  const [showConfig, setShowConfig] = useState(false);

  return (
    <div className="p-4 grid grid-cols-3">
      <h2
        onClick={() => {
          setShowConfig(!showConfig);
        }}
        className="pb-4 border-b-2 border-b-grey text-xl font-bold mb-4 col-span-3 cursor-pointer"
      >
        Buy In Breakdown
        {showConfig ? (
          <ArrowUpIcon className="h-3 w-6 inline-block" />
        ) : (
          <ArrowDownIcon className="h-3 w-6 inline-block" />
        )}
      </h2>
      {showConfig && (
        <>
          <div
            className="flex flex-col col-span-3 items-center mx-auto"
            style={{ maxWidth: "min-content" }}
          >
            <label className="block mb-2">
              Action:
              <input
                className="border border-gray-300 rounded px-2 py-1 ml-auto"
                type="number"
                value={actionBuyIn}
                onChange={(e) => setActionBuyIn(parseFloat(e.target.value))}
              />
            </label>
            <label className="block mb-2">
              CTP:
              <input
                className="border border-gray-300 rounded px-2 py-1 ml-auto"
                type="number"
                value={ctpBuyIn}
                onChange={(e) => setCtpBuyIn(parseFloat(e.target.value))}
              />
            </label>
            <label className="block mb-2">
              Bounty:
              <input
                className="border border-gray-300 rounded px-2 py-1 ml-auto"
                type="number"
                value={bountyBuyIn}
                onChange={(e) => setBountyBuyIn(parseFloat(e.target.value))}
              />
            </label>
            <label className="block mb-2">
              Ace:
              <input
                className="border border-gray-300 rounded px-2 py-1 ml-auto"
                type="number"
                value={aceBuyIn}
                onChange={(e) => setAceBuyIn(parseFloat(e.target.value))}
              />
            </label>
            <label className="block mb-2">
              Other:
              <input
                className="border border-gray-300 rounded px-2 py-1 ml-auto"
                type="number"
                value={otherBuyIn}
                onChange={(e) => setOtherBuyIn(parseFloat(e.target.value))}
              />
            </label>
          </div>
          <div className="col-span- col-start-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              type="button"
              onClick={() => {
                console.log("config changed");
                onConfigUpdate({
                  actionBuyIn,
                  ctpBuyIn,
                  bountyBuyIn,
                  aceBuyIn,
                  otherBuyIn,
                });
              }}
            >
              Save Buy In
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default BuyIn;
