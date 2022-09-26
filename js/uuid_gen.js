function uuid(len) {

  const chars = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890';
  let res = "";

  for (let i = 0; i < len; i++) {

    let indexChar = Math.floor(Math.random() * chars.length);
    res += chars[indexChar];

  }

  return res;

}
