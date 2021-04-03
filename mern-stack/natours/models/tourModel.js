const mongoose = require ('mongoose');
const slugify = require ('slugify');
const validator = require ('validator');

const tourSchema = new mongoose.Schema (
  {
    name: {
      type: String,
      required: [true, 'a tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'a tour name must have less than 40 characters'],
      minlength: [10, 'a tour name must have more than 10 characters'],
      // validate: [validator.isAlpha, 'a tour name must only contain characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'a tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'a tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'a tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'possible values are: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'ratings must be above 1'],
      max: [5, 'ratings must be below 5'],
    },
    ratingsQuantity: {type: Number, default: 0},

    price: {type: Number, required: [true, 'a tour must have a price']},
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          //only works while creating (not updating)
          return val < this.price; //validate price > priceDiscount
        },
        message: 'discount price should be less than actual price',
      },
    },
    summary: {
      type: String,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'a tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'a tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now (),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {virtuals: true},
    toObject: {virtuals: true},
  }
);

tourSchema.virtual ('durationWeeks').get (function () {
  return this.duration / 7;
});

//document middleware (runs before .save() and .create())
tourSchema.pre ('save', function (next) {
  this.slug = slugify (this.name, {lower: true});
  next ();
});

// tourSchema.pre ('save', function (next) {
//   console.log ('will save document');
//   next ();
// });

//post middleware
// tourSchema.post ('save', function (doc, next) {
//   console.log (doc);
//   next ();
// });

//Query Middleware

//query starting with find
tourSchema.pre (/^find/, function (next) {
  this.find ({secretTour: {$ne: true}});
  next ();
});

// tourSchema.post (/^find/, function (docs, next) {
//   console.log (docs);
//   next ();
// });

//Aggregation Middleware
tourSchema.pre ('aggregate', function (next) {
  //exclude secret tours from aggregation pipeline
  this.pipeline ().unshift ({$match: {secretTour: {$ne: true}}});
  next ();
});

const Tour = mongoose.model ('Tour', tourSchema);
module.exports = Tour;
