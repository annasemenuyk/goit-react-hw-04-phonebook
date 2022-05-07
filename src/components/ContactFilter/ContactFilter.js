import PropTypes from 'prop-types';
import styles from './ContactFilter.module.css';

const ContactFilter = ({ value, onFindContact }) => {
  return (
    <label className={styles.Label}>
      Find contacts by name
      <input
        type="text"
        value={value}
        className={styles.Input}
        onChange={onFindContact}
      />
    </label>
  );
};

ContactFilter.propTypes = {
  value: PropTypes.string,
};

export default ContactFilter;
