import React from 'react';
import {Typography, Popper,Paper} from '@mui/material'
import './QuestionTextOverFlow.css'

function isOverflown(element) {
    return (
      element.scrollHeight > element.clientHeight ||
      element.scrollWidth > element.clientWidth
    );
  }
  
  const GridCellExpand = React.memo(function GridCellExpand(props) {
    const { width, value, text } = props;
    const wrapper = React.useRef(null);
    const cellDiv = React.useRef(null);
    const cellValue = React.useRef(null);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showFullCell, setShowFullCell] = React.useState(false);
    const [showPopper, setShowPopper] = React.useState(false);
    const handleMouseEnter = () => {
      const isCurrentlyOverflown = text.length>50||value.tags.length>50;
      setShowPopper(isCurrentlyOverflown);
      setAnchorEl(cellDiv.current);
      setShowFullCell(true);
    };
  
    const handleMouseLeave = () => {
      setShowFullCell(false);
    };
  
    React.useEffect(() => {
      if (!showFullCell) {
        return undefined;
      }
  
      function handleKeyDown(nativeEvent) {
        // IE11, Edge (prior to using Bink?) use 'Esc'
        if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
          setShowFullCell(false);
        }
      }
  
      document.addEventListener('keydown', handleKeyDown);
  
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [setShowFullCell, showFullCell]);
  
    return (
      <div
        ref={wrapper}
        className="root"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          ref={cellDiv}
          style={{width,}}
          className="cell-div-style"
        />
        <div ref={cellValue} className="cellValue">
        <Typography className="tyopography-padding">
                {text==null?<>{value.text}</>:<>{text}</>}
              </Typography>
              <Typography className="tyopography-padding">
                Tags: {value.tags}
              </Typography>
        </div>
        {showPopper && (
          <Popper
            open={showFullCell && anchorEl !== null}
            anchorEl={anchorEl}
          >
            <Paper
              elevation={1}
              style={{ minHeight: wrapper.current.offsetHeight - 3 }}
            >
              <Typography className="tyopography-padding">
              {text==null?<>{value.text}</>:<>{text}</>}
              </Typography>
              <Typography className="tyopography-padding">
                Tags: {value.tags}
              </Typography>
            </Paper>
          </Popper>
        )}
      </div>
    );
  });
  
  const QuestionTextOverFlow =(params) => {
    return (
      <>
      <GridCellExpand tags={params.tags} text={params.text} value={params.value || ''} width={params.colDef.computedWidth} />
      </>
    );
  }
  export default QuestionTextOverFlow;