import { conditions } from "@nucypher/taco";

const FACTORY_ADDRESS = "0x69Aa2f9fe1572F1B640E1bbc512f5c3a734fc77c";
const BYTECODE_HASH =
  "0x9a8bb655e7dad888fdd42ff207691435e25810e1407db5527bffd58f374a2684";

export function createFactoryAddressCondition() {
  const condition = new conditions.base.contract.ContractCondition({
    method: "computeAddress",
    parameters: [BYTECODE_HASH, ":salt"],
    functionAbi: {
      name: "computeAddress",
      type: "function",
      stateMutability: "view",
      inputs: [
        { type: "bytes32", name: "_bytecodeHash", internalType: "bytes32" },
        { type: "bytes32", name: "_salt", internalType: "bytes32" },
      ],
      outputs: [{ type: "address", name: "addr_", internalType: "address" }],
    },
    contractAddress: FACTORY_ADDRESS,
    chain: 84532,
    returnValueTest: {
      comparator: "==",
      value: ":userAddress",
    },
  });

  return condition.toObj();
}

// Run this script to output the JSON condition
if (require.main === module) {
  const conditionJson = createFactoryAddressCondition();
  console.log(JSON.stringify(conditionJson, null, 2));
}
