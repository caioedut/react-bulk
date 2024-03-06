import global from './global';

export default function crypt(str: string) {
  return crc32(str).toString(16);
}

function crc32(str) {
  if (!global.crcTable) {
    global.crcTable = makeCRCTable();
  }

  let crc = 0 ^ -1;

  for (let i = 0; i < str.length; i++) {
    crc = (crc >>> 8) ^ global.crcTable[(crc ^ str.charCodeAt(i)) & 0xff];
  }

  return (crc ^ -1) >>> 0;
}

function makeCRCTable() {
  const crcTable: any[] = [];

  let c;

  for (let n = 0; n < 256; n++) {
    c = n;

    for (let k = 0; k < 8; k++) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }

    crcTable[n] = c;
  }

  return crcTable;
}
