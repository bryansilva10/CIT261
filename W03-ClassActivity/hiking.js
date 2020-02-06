//create an array of hikes

      const hikeList = [
        {
          name: 'Bechler Falls',
          imgSrc: 'falls.jpg',
          imgAlt: 'Image of Bechler Falls',
          distance: '3 miles',
          difficulty: 'Easy',
          description:
            'Beautiful short hike along the Bechler river to Bechler Falls',
          directions:
            'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to the end of the Cave Falls road. There is a parking area at the trailhead.'
        },
        {
          name: 'Teton Canyon',
          imgSrc: 'falls.jpg',
          imgAlt: 'Image of Teton Canyon',
          distance: '5 miles',
          difficulty: 'Moderate',
          description: 'Beautiful short hike up Teton Canyon',
          directions:
            'Take Highway 33 to Driggs. Turn right into the town and continue through. Follow that road for a few miles then turn right up Teton Canyon. Drive to the end of the road. There is a parking area at the trailhead.'
        },
        {
          name: 'Denanda Falls',
          imgSrc: 'falls.jpg',
          imgAlt: 'Image of Denanda Falls',
          distance: '12 miles',
          difficulty: 'Moderate',
          description:
            'Beautiful hike through Bechler Meadows to Denanda Falls',
          directions:
            'Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for several miles then turn left again at the sign for the Bechler Meadows ranger station. There is a parking area at the trailhead.'
        }
      ];

//delete everything from the html in the UL
const listElement = document.getElementById('hikes');
listElement.innerHTML = "";

//image path
const imagePath = "https://byui-cit.github.io/cit261/examples/";

const buildHikeDetails = hike => {
  //create a list item element
  const item = document.createElement('li');
  item.innerHTML = `
          <img
            src="https://byui-cit.github.io/cit261/examples/${hike.imgSrc}"
            alt="${hike.imgAlt}"
          />
          <h2>${hike.name}</h2>
          <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
          </div>
          <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
          </div>
          <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
          </div>
          <div>
            <h3>How to get there</h3>
            <p>
              ${hike.directions}
            </p>
          </div>
  `;

  item.addEventListener('touchend', e => {
    e.currentTarget.querySelector('h2');
  })

  //return the item
  return item;
}

const buildSmallDetails = hike => {
  const item = document.createElement('li');
  item.classList.add('light');
  item.innerHTML = `
        <h2>${hike.name}</h2>
      <div class="image">
        <img src="https://byui-cit.github.io/cit261/examples/${hike.imgSrc}" alt="${hike.imgAlt}">
      </div>
      <div>
        <div>
        <h3>Distance</h3>
        <p>${hike.distance}</p>
        </div>
        <div>
          <h3>Difficulty</h3>
          <p>${hike.difficulty}</p>
        </div> 
      </div>`;

      return item;
}

const buildList = () => {
  hikeList.forEach(hike => {
    listElement.appendChild(buildSmallDetails(hike))
  })
}

buildList();