import React from 'react';

const Notes = () => {
    return (
        <div className="container-wrapper">
            <div className="container-inner">
            <div class="input-group">
                <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                <button type="button" class="btn btn-outline-primary">search</button>
            </div>
        </div>
        </div>
    );
};

export default Notes;