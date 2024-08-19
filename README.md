# atlast
Personnal Knowledge Database made with Vue3 and Strapi

[atlast.vercel.app](https://atlast.vercel.app)
( not working for now, no server for data waa waa :< )

![atlast preview](atlast2.png?raw=true "Atlast preview")


# TODO

add Landing page // debug connexion :x


- [ ] component to enable/disable stuff ? size by size comparison
- [ ] on different user page indicate if media is in my library as well
    by making request if route.user != connecteduser and comparing results
    add div if result matches 
- [ ] add search on other person library
    same, add user results in mediaSearch if not me
- [ ] add shortcut / usage page / auto active on first connection ?


- [ ] strange user behavior : click/routing not working at times ?
- [ ] reload userlist when different user !!!


- [ ] better page number for pagination
- [ ] when adding / deleting media stay on current page (if  pagecount unchanged!)


- [ ] clean filter (css + html)
- [ ] filter categs -> icons ???
- [ ] check search > type seems to reset results ???
- [ ] media + update check if store is better than input for size

- [ ] All media count doesn't update (add/delete)

- [ ] fix color names

- [ ] fix filter count :(

- [ ] update Links
- [ ] rework links like medias

- [ ] update users
- [ ] add user filteredlist ?
- [ ] on different user media, search user media, or mine ???
- [ ] on different user media, see if in my library ?
- [ ] on different user media, add filter for common media ?
- [ ] add option to make library public/private ?
- [ ] disable edit if same object ????

- [ ] credentials not updating on new account creation :/
- [ ] list forever loading on new account creation :/

# ???
- [ ] add config panel to create new collections ? like links and media

# fonts
- [ ] fix font render

# search
- [ ] either close or rerender on delete/add/edit !

# atomic
- [ ] menu buttons (icon / text / texticon) maybe ...

# css
- [ ] clean & refactor css
- [ ] bem everywhere
- [ ] responsive

# models
- [ ] change actions name to status

# Accessibility
- [ ] aria and focus and img alt and link hover

# Performance
- [ ] check how to cache data (done already with store ?)
- [ ] check how to lazy load images

# links
- [ ] parent sites ? "main" link with sublinks !!!
- [ ] new categs : cosmos/science ? fun ? urban/street ? music ? games ? food ?
- [ ] move filters to component / copy media
