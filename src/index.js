import React from 'react'
import {TrackDocument, Track} from 'react-track';
import {topTop} from 'react-track/tracking-formulas';
import {Motion, spring} from 'react-motion';

const formatToCorrectStyle = (styles) => {
	let formattedStyles = styles
	if(styles.rotation) {
		formattedStyles = {
			...formattedStyles,
			transform: `rotate3d(${styles.rotation}, ${styles.rotation}, ${styles.rotation}, ${styles.rotation}deg)`,
		}
	} 
	if(styles.transformX) {
		formattedStyles = {
			...formattedStyles,
			transform: `translateX(${styles.transformX}px)`,
		}
	}
	if(styles.transformY) {
		formattedStyles = {
			...formattedStyles,
			transform: `translateY(${styles.transformY}px)`,
		}
	}
	return formattedStyles
}

const WithFadeAnimation = ({ highestScroll, currentScrollY, render, defaultStyle, animatedStyles }) => (
	<TrackDocument formulas={[topTop]}>
	  {topTop =>
	    <Track component="div" formulas={[topTop]}>
		    {(DIV,posTopTop) =>
		    	<DIV>
		    		<Motion 
		    			defaultStyle={{...defaultStyle}} 
		    			style={{...Object.keys(animatedStyles).reduce((final, curr) => ({
		    					...final,
		    					[curr]: (parseInt(currentScrollY) > parseInt(posTopTop) && parseInt(posTopTop) != 0) || highestScroll > currentScrollY ? spring(animatedStyles[curr]) : defaultStyle[curr]
		    				}), {})
		    			}}
		    		>
		    			{(styles) =>
		    				render({ styles: formatToCorrectStyle(styles) }) 
		    			}
		    		</Motion>
		    	</DIV>
		    }
	    </Track>
	  }
	</TrackDocument>
)

export default WithFadeAnimation