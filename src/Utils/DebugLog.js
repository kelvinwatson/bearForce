var DEBUG = process.env.NODE_ENV !== 'production';

const DebugLog = (msg, ...args) => {
  if (!DEBUG) return;

  msg = 'DEBUG_LOG ' + msg;

  args.length > 0 ? _logArgs(msg, args) : console.log(msg);
}

const _logArgs = (msg, ...args) =>{
  console.log(msg);
  
  args.forEach((arg)=>{
    console.log(arg);
  });
}

export default DebugLog;
