import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useApi } from "../../hooks/useApi";
import api from "../../utils/Api";
import Spinner from "../Spinner";
import NotFound from "../NotFound";
import "./index.css";

export const Photo = () => {

   const { photoId } = useParams();

   const handler = useCallback(() => {
      return api.getPhotoById(photoId);
   }, [photoId]);

   const { data, loading, error } = useApi(handler);

   if (loading) {
      return <Spinner />
   };

   if (error) {
      return <NotFound />
   };

   const { src, title, subtitle } = data;

   return (
      < div className="photo">
         {" "}
         <Link className="photo-goback" to="/">
            {" "}
            Go back{" "}
         </Link>{" "}
         <img className="photo-image" src={src} alt={title} />{" "}
         <p className="photo-title">{title}</p>{" "}
         <p className="photo-subtitle">{subtitle}</p>{" "}
      </div>
   );
};