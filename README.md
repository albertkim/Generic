# Generic
A basic server structure for my future projects. This is the result after accumulating a year+ of node knowledge, with carefully considered stack decisions.

Stack:

* Node.js
* Restify - I feel that this the best choice for writing an API centric service without any of the view clutter that comes with Express. In addition, benchmarks show that Restify is among the fastest frameworks out there when it comes to requests per second.
* Passport - Consistent authentication method throughout the application without boilerplate code.
* Bookshelf + Knex - Non-bloated relational database ORM and query builder with solid transaction support and ability to write manual sql queries
* Bunyan - Great JSON-focused logging with a built-in CLI tool for human friendly log viewing