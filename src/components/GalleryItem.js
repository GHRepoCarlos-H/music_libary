//folder components file GalleryItem
import { useState } from 'react'
import { Link } from 'react-router-dom'


function GalleryItem(props) {
    let [view, setView] = useState(false)

    const simpleView = () => {
        const simpleStyle = {
            'width': '30vw',
            'height': '30vh',
            'border': '9px inset purple',
            'margin': '5px',
            'backgroundColor': 'black',
            'color': 'white'
        }
        return (
            <div style={simpleStyle}>
                <h3>{props.item.trackName}</h3>
                <img src={props.item.artworkUrl100} alt={props.item.trackName} />
                <h4>{props.item.collectionName}</h4>
                

            </div>
        )
    }

    
    const detailView = () => {
        const detailStyle = {
          'width': '60vw',  // Updated to cover the entire width
          'height': '20vh',
          'margin': '2px',
          'backgroundRepeat': 'no-repeat',
          'backgroundSize': 'cover',
          'backgroundColor': 'black',
          'color': 'white',
        };
      
        return (
          <div style={detailStyle}>
            <h2>{props.item.trackName}</h2>
            <h3>
              <Link to={`/artist/${props.item.artistId}`}>
                {props.item.artistName}
              </Link>
            </h3>
            
            <h3>
              <Link to={`/album/${props.item.collectionId}`}>
              {props.item.collectionName}
              </Link>
            </h3>
            <h4>{props.item.primaryGenreName}</h4>
            <h4>{props.item.releaseDate}</h4>
          </div>
        );
      };
      

    return (
        <div onClick={() => setView(!view)} style={{'display': 'inline-block'}}>
        
            {/* This simple ternary shows the simple view when 'view' is false! */}
            {view ? detailView() : simpleView()}

        </div>
    )

}
export default GalleryItem
