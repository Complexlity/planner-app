# Quotes Widget

I have implemented a new widget which shows quotes on the planner app

## Why

This widget serves as a source of inspiration which provides some encouragement and motivation for a person to carry out their activities for the day. It's a feature a have used in the passed and I found that it helped me remain focused for the rest of the day

## Features

1. It changes the quotes every second
2. It has options to change the type of quote you want to view. Options include

- Inspiration (default)
- Courage
- Education
- Success
- Happiness

3. Hovering over the quote would prevent the quote from changing. I find this is important to be able to read some long quotes


## How It Works

### Getting the data

I have gotten the quotes data from an [api](https://api-ninjas.com/api/quotes).
To manage the fetching of this data effectively (capturing loading and error states), I have use [swr](https://swr.vercel.app/), a package that effectively handles this

```javascript
const {data, error, isLoading}  = useSWR(url, getRandomQuote)
```

### Changing Quote Types

I created a select element and a state called `category`. Making this select element a controlled input where it changes the `category` whenever in fetches the appropriate data

```javascript
<select
  value={category}
  onChange={(e) => { setCategory(e.target.value)}}
  ...
  />
```

### Loading State

I also made a loading spinner which shows whenever the data is currently being fetched.

```javascript
{isLoading && <LoadingSpinner/>}
```

### Showing Data

The data returned from querying the [api](https://api-ninjas.com/api/quotes) endpoint is an array of quotes concerning the selected option. See [getRandomQuotes.js](./getRandomQuotes.js)

I needed to show this data one after the other and also add some slight animation to it when it changes.

I used `setInterval` function to change the displayedData every 1000ms(1s). This runs in a useEffect and happens when either the data or the hover state changes

```
  useEffect(() => {
    interval = setInterval(() => {
      /* Only runs if the quote text is not in hover state */
      if (!isHovered) {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % data.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [data.length, data, isHovered]);
```

I made use of [framer-motion](https://www.framer.com/motion/). This package provides an easy way to animate elements and added to that, it can also animate react elements when they mount and unmount and this is an added advantage to plain CSS/javascript.
I used `AnimatePresence` to animate the element when it is created and destroyed and also `motion.div` properties to set the animation values

```javascript
<AnimatePresence mode="wait">
      {displayedData && (
        <motion.div
          animate={{ opacity: 1, top: "10px" }}
          /*... other attributes */
        >
          <p className="quote">{displayedData}</p>
        </motion.div>
      )}
    </AnimatePresence>
```

### Hover State

I wanted to add the added functionality where the quote is hovered on, it would not change (assuming the user would still be reading it). I added two functions `handleMouseEnter` and `handleMouseLeave`. These two functions trigger the hover state which determines if the displayed data should change or not


### Pseudocode

In much simpler terms, here's how the code works

1. Fetch data from api (returns an array of quotes)

- show loading state when fetching, set data when done

2. Create a select element which triggers re-fetching whenever it changes
3. Loop through this array of data and display one per time
4. Animate this displayed data (fade in and out)

