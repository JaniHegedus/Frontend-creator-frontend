import React from 'react';
const Loading: () => React.JSX.Element = () =>
{
    return(
        <div className="container">
            <div className="sun">
                <div className="orbit earth">
                    <div className="globe earth">
                        <div className="orbit moon">
                            <div className="globe moon"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Loading;