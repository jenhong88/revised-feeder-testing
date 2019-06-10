/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* a test that loops through each feed in the allFeeds object and ensures
        it has a URL defined and that the URL is not empty.
         */

        it('url included', function() {
          allFeeds.forEach(function (feed) {
            expect(feed.url).toBeDefined();
            expect(feed.url).not.toEqual('');
          });
        });

        /*a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

         it('name defined', function() {
           allFeeds.forEach(function(feed) {
             expect(feed.name).toBeDefined();
             expect(feed.name).not.toEqual('');
           });
         });
       });



           /* a test that ensures the menu element is
            * hidden by default.
            */

       describe('The menu', function() {
         /* calling on a fake successful initial loading of the page/server
         to test that the default setting is 'menu-hidden'
         */

          it('menu is hidden by default', function(done){
           spyOn($,"ajax").and.callFake(function(e) {
             e.success({});
           });

           expect($('body').hasClass('menu-hidden')).toBeTruthy();
           done();
         });

         /* a test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */

          it('menu changes visibility when clicked', function() {
            /*
            checking to see that the menu visibility changes as expected upon
            clicks
            */


            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).not.toBeTruthy();
            $('.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBeTruthy()
        });
      });


    describe('Initial Entries', function() {
      /* a test that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.

       since loadfeed is an asynchronous function, it should take 'done' as a second argument
       */

       beforeEach(function(done) {
         $('.feed').empty();
         loadFeed(0, done);
       });

       it('loadFeed includes entries', function() {
         expect($('.feed .entry').length).not.toBe(0);
       });

     });


     describe('New Feed Selection', function() {
       var firstFeed, secondFeed;

       /* a test that ensures when a new feed is loaded
        * by the loadFeed function that the content actually changes.
        */
        beforeEach((done) => {
          loadFeed(0, function() {
            firstFeed = $('.feed').html();
            loadFeed(1, function() {
               secondFeed = $('.feed').html();
              done();
            });
          });
    });

    it('new feed worked and content is changed', function(done) {
     expect(firstFeed).not.toBe(secondFeed);
      done();
    });
  });

}())
