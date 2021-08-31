const Pipeline = require('../models/pipeline');
// const InjectionPoint = require('../models/injectionPoint');
// const { body, validationResult } = require('express-validator');

exports.pipeline_list = function (req, res, next) {

  Pipeline.find({})
    // .sort({ license: 1, segment: 1, created_at: 1 })
    .exec(function (err, list_pipelines) {
      if (err) { return next(err); }
      res.json(list_pipelines);
    });

};

exports.pipeline_copy_post = function (req, res, next) {

  const newPipeline = new Pipeline(
    {
      license: req.body.license,
      segment: req.body.segment,
      substance: req.body.substance,
      from: req.body.from,
      to: req.body.to,
      "injection points": req.body["injection points"],
      status: req.body.status
    });

  newPipeline.save()
    .then(() => res.json('Pipeline added!'))
    .catch(err => res.status(400).json('Error: ' + err));

};


exports.pipeline_update_post = [

  // Convert the injection points to an array
  (req, res, next) => {
    if (!(req.body["injection points"] instanceof Array)) {
      if (typeof req.body["injection points"] === 'undefined')
        req.body["injection points"] = [];
      else
        req.body["injection points"] = new Array(req.body["injection points"]);
    }
    next();
  },

  (req, res, next) => {

    // Create a Pipeline object with escaped/trimmed data and old id.

    const newPipeline = new Pipeline(
      {
        license: req.body.license,
        segment: req.body.segment,
        substance: req.body.substance,
        from: req.body.from,
        to: req.body.to,
        "injection points": (typeof req.body["injection points"] === 'undefined') ? [] : req.body["injection points"],
        status: req.body.status,
        created_at: req.body.created_at,
        _id: req.params.id //This is required, or a new ID will be assigned!
      });

    Pipeline.findByIdAndUpdate(req.params.id, newPipeline, {}, function (err, thepipeline) {
      if (err) { return next(err); }
      console.log("Updated Pipeline : ", thepipeline);
      res.json('Pipeline updated!');
    });
  }
];


exports.pipeline_delete_post = function (req, res, next) {
  Pipeline.findByIdAndRemove(req.params.id, function deleteAuthor(err, thepipeline) {
    if (err) { return next(err); }
    console.log("Deleted Pipeline : ", thepipeline);
    res.json('Pipeline deleted!');
  });
}

/*// Handle pipeline create on POST.
exports.pipeline_create_post = [
  // Convert the injection point to an array.
  (req, res, next) => {
    if (!(req.body["injection point"] instanceof Array)) {
      if (typeof req.body["injection point"] === 'undefined')
        req.body["injection point"] = [];
      else
        req.body["injection point"] = new Array(req.body["injection point"]);
    }
    next();
  },

  // Validate and sanitise fields.
  body('license', 'License must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('segment', 'Segment must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('substance', 'Substance must not be empty.').trim().isLength({ min: 1 }).escape(),
  body('from', 'From must not be empty').trim().isLength({ min: 1 }).escape(),
  body('to', 'To must not be empty').trim().isLength({ min: 1 }).escape(),
  body('["injection points"].*').escape(),
  body('status').escape(),
  body('created_at', 'Invalid date').optional({ checkFalsy: true }).isISO8601().toDate(),

  // Process request after validation and sanitization.
  (req, res, next) => {

    // Extract the validation errors from a request.
    const errors = validationResult(req);

    // Create a Pipeline object with escaped and trimmed data.
    var pipeline = new Pipeline(
      {
        license: req.body.license,
        segment: req.body.segment,
        substance: req.body.substance,
        from: req.body.from,
        to: req.body.to,
        "injection points": req.body["injection points"],
        status: req.body.status,
        created_at: req.body.created_at
      });

    if (!errors.isEmpty()) {
      // There are errors. Render form again with sanitized values/error messages.

      // Get all injection points for form.
      async.parallel({
        authors: function (callback) {
          Author.find(callback);
        },
        genres: function (callback) {
          Genre.find(callback);
        },
      }, function (err, results) {
        if (err) { return next(err); }

        // Mark our selected genres as checked.
        for (let i = 0; i < results.genres.length; i++) {
          if (book.genre.indexOf(results.genres[i]._id) > -1) {
            results.genres[i].checked = 'true';
          }
        }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres, book: book, errors: errors.array() });
      });
      return;
    }
    else {
      // Data from form is valid. Save book.
      book.save(function (err) {
        if (err) { return next(err); }
        //successful - redirect to new book record.
        res.redirect(book.url);
      });
    }
  }
];*/