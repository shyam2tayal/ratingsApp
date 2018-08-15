The app is using CDN for all dependencies 

Current features of the App
1) User cannot route to any page if not loggedin
2) User cannot access loggedin page if already loggedin
3) State of user is maintained , means if loggedin one time ,page can be refreshed , state won't be lost.
4) Pages are completely mobile responsive
5) watchlist of all the users will be maintained , if user logout and login back then also his watch list will be visible
6) pagination is extensible with first and last button for better ease use.
7) Graph to show album id vs count of that album id
8) Logout button to exit session and redirect to login page


--> All point mentioned in the tasks are almost done , Due to time constraint UI/UX is not upto mark but tried to make app as much scalable and modular and also in login or watchlist tried to cover all the edge cases .
Please do let me know if i missed out something or something is misunderstood in the task.


Running the App
-> App can be run by any local server , if using linux simply get into the app folder and run

  ` python -m SimpleHTTPSever 8000`
  
  Your app will be served at 8000 port.
