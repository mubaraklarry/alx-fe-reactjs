const UserProfile = (props) => {
  return (
    <div style={{ 
      border: '1px solid gray', 
      borderRadius: '8px',
      padding: '20px', 
      margin: '20px auto', 
      maxWidth: '400px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
    }}>
      <h2 style={{ 
        color: 'darkblue', 
        marginTop: '0' 
      }}>
        {props.name}
      </h2>
      <p style={{ margin: '8px 0' }}>
        Age: <span style={{ fontWeight: 'bold', color: 'teal' }}>{props.age}</span>
      </p>
      <p style={{ margin: '8px 0', fontStyle: 'italic' }}>
        Bio: {props.bio}
      </p>
    </div>
  );
};

export default UserProfile;