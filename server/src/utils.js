exports.wrapAsync = function wrapAsync(asyncHandler) {
    return (req, res, next) => {
      asyncHandler(req, res, next)
      .catch(ex => {
        console.error(ex);
        res.status(500).send(ex.message);
      });
    };
  }