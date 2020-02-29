export default (handler: any) => (req: any, res: any) => {
    if (req.session) {
      req.session.nowInMinutes = Math.floor(Date.now() / 60e3);
    }
    handler(req, res);
  };