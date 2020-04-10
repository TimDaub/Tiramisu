const { toBuffer, setLength, bufferToHex, bufferToInt } = require('ethereumjs-utils');
const { BigNumber } = require('sparse-merkle-tree');

const toInt = (value) => {
  if (typeof value == 'number') return value;
  if (typeof value == 'string') {
    if (value.slice(0, 2) == '0x') return parseInt(value, 16);
    return +value;
  }
  if (Buffer.isBuffer(value)) return bufferToInt(value);
  if (BigNumber.isBigNumber(value)) return value.toNumber();
  throw new Error('Did not recognize type.');
}

const toHex = (value) => {
  if (typeof value == 'number') return value.toString(16);
  if (typeof value == 'string') {
    if (value.slice(0, 2) == '0x') value;
    return (+value).toString(16);
  }
  if (Buffer.isBuffer(value)) return bufferToHex(value);
  if (BigNumber.isBigNumber(value)) return value.toString('hex');
  throw new Error('Did not recognize type.');
}

const toBuf = (value, length) => {
  const buf = toBuffer(value);
  return (length) ? setLength(buf, length) : buf;
}

module.exports = {
  toInt,
  toHex,
  toBuf,
};