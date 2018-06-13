/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against the application.
 */

$(function() {
    /*This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* Tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /*  A test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */

         it('it should ensure it has has a URL defined and that the URL is not empty', function(){
           allFeeds.forEach(function(feed){
             //Option 1
             // var url = feed.url;
             // expect(url).toBeDefined();
             // expect(url.length).not.toBe(0);
             expect(feed.url).toBeTruthy();
           });
         });



        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('it should ensure it has has name field and that name is not empty', function(){
           allFeeds.forEach(function(feed){ // checking each feed
             var name = feed.name;
             expect(name).toBeDefined();
             expect(name.length).not.toBe(0);
           });
         });
    });


    /* Test suite that ensures the menu element is
     * hidden by default and ensures the menu changes
     * visibility when the menu icon is clicked
      */
         describe('The menu', function(){
           // If true, then the menu is hidden
           it("body has the 'menu-hidden' initially", function() {
            expect($('body').hasClass('menu-hidden')).toEqual(true);
          });

          // Toggle on the click event, check if the menu appears or it disappears
          it('working toggle on click event', function () {
              $('.menu-icon-link').trigger('click');// Calls the class of 'menu-icon-link'
              expect($('body').hasClass('menu-hidden')).toBe(false);
              $('.menu-icon-link').trigger('click');
              expect($('body').hasClass('menu-hidden')).toBe(true);
            });
         });


    /* Test suite that ensures when the loadFeed
       * function is called and completes its work, there is at least
       * a single .entry element within the .feed container.
       */
     describe('Initial Entries', function(){
       beforeEach(function(done) {
            loadFeed(0, done);
      });

      it('there is at least a single entry element within the feed container', function(){
          expect($('.feed .entry').length).toBeGreaterThan(0);
      });

     });

    /* Test suite that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * loadFeed() is asynchronous.
         */
    describe('New Feed Selection', function(){
       var testNewFeed;
       beforeEach(function(done) {
         loadFeed(0, function() {
         testNewFeed = $('.feed').html();
         loadFeed(1, done);
          });
       });

        it('Ensures when a new feed is loaded', function(){
               expect($('.feed').html()).not.toEqual(testNewFeed);
           });
      });

}());
