import { Router, Request, Response } from "express";

var router = Router()

router.get('/:parkingId', (req: Request, res: Response): void => {
    

    res.send(' card endpoint requested')

})

export default router