import '../App.css';
import { CLASS_LIST } from '../consts.js';

function ClassAttributes(classProp) {
  return (
    <div className="Class-attributes">
      {Object.entries(CLASS_LIST[classProp.classKey]).map((([k,v]) => (
        <div>
          {k}: {v}
        </div>
      )))}
    </div>
  );
}

export default ClassAttributes;
