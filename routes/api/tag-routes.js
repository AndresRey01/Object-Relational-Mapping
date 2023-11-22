const router = require("express").Router();
const { Tag, Product } = require("../../models");

router.get("/", async (req, res) => {
  try {
    const tagData = await Tag.findAll({
      include: [{ model: Product }],
    });
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve tags." });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const tagData = await Tag.findByPk(req.params.id, {
      include: [{ model: Product }],
    });
    if (!tagData) {
      res.status(404).json({ message: "Tag not found." });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to retrieve the tag." });
  }
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);
    res.status(201).json(tagData); // Use 201 for resource creation
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Tag creation failed." });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const [updated] = await Tag.update(req.body, {
      where: { id: req.params.id },
    });
    if (!updated) {
      res.status(404).json({ message: "Tag not found." });
      return;
    }
    res.status(200).json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update the tag." });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Tag.destroy({ where: { id: req.params.id } });
    if (!deleted) {
      res.status(404).json({ message: "Tag not found." });
      return;
    }
    res.status(200).json(deleted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete the tag." });
  }
});

module.exports = router;
