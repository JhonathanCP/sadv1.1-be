import { Router } from "express";
import { approveAccessRequest, denyAccessRequest, getAccessRequestsByUser, uploadPdfMiddleware, getAllAccessRequests, getAccessRequestById, createAccessRequest, updateAccessRequest, deleteAccessRequest, uploadPdfForAccessRequest, getPdfById } from "../controllers/accessrequest.controller.js"
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const accessRequestRouter = Router()

accessRequestRouter.get('/', [verifyToken], getAllAccessRequests);
accessRequestRouter.get('/user/:userId', [verifyToken], getAccessRequestsByUser);
accessRequestRouter.get('/:id', [verifyToken], getAccessRequestById);
accessRequestRouter.post('/', [verifyToken], createAccessRequest);
accessRequestRouter.put('/:id', [verifyToken, isAdmin],updateAccessRequest);
accessRequestRouter.put('/:id/approve', [verifyToken, isAdmin],approveAccessRequest);
accessRequestRouter.put('/:id/deny', [verifyToken, isAdmin],denyAccessRequest);
accessRequestRouter.delete('/:id', [verifyToken],deleteAccessRequest);
accessRequestRouter.post('/:id/pdf', [verifyToken], uploadPdfMiddleware, uploadPdfForAccessRequest);
accessRequestRouter.get('/:id/pdf',  getPdfById);

export default accessRequestRouter;