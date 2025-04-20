import React from 'react';

interface PandaAnimationProps {
  mood: 'happy' | 'neutral' | 'sad';
}

const PandaAnimation: React.FC<PandaAnimationProps> = ({ mood }) => {
  return (
    <div className="panda-animation-wrapper">
      <div className="animation-stage">
        <div className="animation-container">
          <div className={`panda ${mood}-panda`}>
            <div className="panda-body">
              <div className={`panda-head ${mood === 'sad' ? 'sad-head' : ''}`}>
                <div className="panda-face">
                  <div className="eyes">
                    <div className="eye left">
                      <div className={`pupil ${mood}-pupil`}></div>
                      {mood === 'happy' && <div className="sparkle"></div>}
                      {mood === 'sad' && <div className="tear left"></div>}
                    </div>
                    <div className="eye right">
                      <div className={`pupil ${mood}-pupil`}></div>
                      {mood === 'happy' && <div className="sparkle"></div>}
                      {mood === 'sad' && <div className="tear right"></div>}
                    </div>
                  </div>
                  
                  <div className="nose"></div>
                  
                  <div className={`mouth ${mood}-mouth`}>
                    {mood === 'happy' && (
                      <>
                        <div className="happy-cheek left"></div>
                        <div className="happy-cheek right"></div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="ear left"></div>
                <div className="ear right"></div>
              </div>
              
              <div className="arms">
                <div className={`arm left ${mood}-arm-left`}></div>
                <div className={`arm right ${mood}-arm-right`}></div>
              </div>
              
              <div className="legs">
                <div className={`leg left ${mood === 'happy' ? 'happy-leg-left' : ''}`}></div>
                <div className={`leg right ${mood === 'happy' ? 'happy-leg-right' : ''}`}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PandaAnimation;