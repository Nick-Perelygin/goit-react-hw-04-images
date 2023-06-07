import PropTypes from 'prop-types';

export default function Button ({onClick}) {
    <button type="button" className="Button" onClick={onClick}>
        <span>Load more</span>
    </button>
}

Button.propTypes = {
    onClick: PropTypes.func,
};