// GLTF meshes can share materials, geometries, textures and image bitmaps.
export function disposeObject3D(root, disposed = new Set()) {
  const once = (resource, cleanup) => {
    if (!resource || disposed.has(resource)) return;
    disposed.add(resource);
    cleanup(resource);
  };
  const texture = value => {
    if (!value?.isTexture) return;
    once(value, value => {
      value.dispose();
      for (const image of [value.image].flat()) once(image, image => image.close?.());
    });
  };
  root?.traverse(node => {
    once(node.geometry, value => value.dispose());
    once(node.skeleton, value => value.dispose());
    for (const material of [node.material].flat()) {
      once(material, material => {
        Object.values(material).forEach(texture);
        Object.values(material.uniforms || {}).forEach(uniform => texture(uniform.value));
        material.dispose();
      });
    }
  });
}
