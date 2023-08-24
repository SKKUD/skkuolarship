// 지원방법 문자열 파싱 함수 (제출처, 제출서류, 제출기한)
const parseApplyMethod = (applyMethodString) => {
    if (!applyMethodString) {
      return null;
    }
  
    const lines = applyMethodString.split('\n');
    const submitToLine = lines.find(line => line.startsWith('제출처:'));
    const submitListsLine = lines.find(line => line.startsWith('제출서류:'));
    const submitDateLine = lines.find(line => line.startsWith('제출기한:'));
  
    const submitTo = submitToLine ? submitToLine.split(': ')[1] : null;
    const submitLists = submitListsLine ? submitListsLine.split(': ')[1].replace('[', '').replace(']', '').split(', ') : null;
    const submitDate = submitDateLine ? submitDateLine.split(': ')[1] : null;
  
    return (
      <ul>
        {submitTo && <li><span style={{ fontWeight: 900 }}>제출처:</span> {submitTo}</li>}
        {submitLists && (
          <li>
            <span style={{ fontWeight: 900 }}>제출서류:</span>
            <ul>
              {submitLists.map((list, index) => (
                <li key={index}>{list}</li>
              ))}
            </ul>
          </li>
        )}
        {submitDate && <li><span style={{ fontWeight: 900 }}>제출기한:</span> {submitDate}</li>}
      </ul>
    );
  };
  
  export default parseApplyMethod;
  