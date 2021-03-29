import numpy as np
# import pandas as pd
# import matplotlib.pyplot as plt


def compute_distances_betw_cubes(cubes):
    distances = []
    for cube_outer in cubes:
        for cube_inner in cubes:
            dist = np.sqrt((float(cube_outer["x"]) - float(cube_inner["x"])) ** 2.0 + (float(cube_outer["y"]) - float(cube_inner["y"])) ** 2.0)
            # if (1.0 < dist <= 2.0):
            distances.append([cube_outer, cube_inner, dist])
    return distances


def compute_distance(cube1, cube2):
    dist = np.sqrt((float(cube1["x"]) - float(cube2["x"])) ** 2.0 + (float(cube1["y"]) - float(cube2["y"])) ** 2.0)
    return dist


def clusterize(cubes_array):
    # print(cubes_array)
    # xz_cubes = []
    # for item in cubes_array:
    #     if item["plane"] == "xz":
    #         print(item)
    xz_cubes = [item for item in cubes_array if item["plane"] == "xz"]
    yz_cubes = [item for item in cubes_array if item["plane"] == "yz"]
    xy_cubes = [item for item in cubes_array if item["plane"] == "xy"]

    # print(len(xz_cubes), len(yz_cubes), len(xy_cubes))
    # print(xz_cubes, yz_cubes, xy_cubes)

    # for item in xz_cubes:
    #     print(item)
    # for item in yz_cubes:
    #     print(item)
    # for item in xy_cubes:
    #     print(item)

    clusters_xz = {}
    clusters_yz = {}
    clusters_xy = {}
    clusters_3d = {}

    # cubes_in_clusters_xz = {}
    # cubes_in_clusters_yz = {}
    # cubes_in_clusters_xy = {}

    # n_clusters_over_xz = 0
    # n_clusters_over_yz = 0
    # n_clusters_over_xy = 0
    n_clusters_3d = 0

    processed_cubes = []  # for cubes where subtraction is done
    clusterized_cubes = []  # for cubes which are already in clusters

    # step 1: preprocessing
    for xzcube in xz_cubes:
        yz_corresponds = [cube for cube in yz_cubes if xzcube["y"] == cube["y"]]
        xy_corresponds = [cube for cube in xy_cubes if xzcube["x"] == cube["x"]]

        # check if cube is single
        yz_edep_equivalence = [cube for cube in yz_corresponds if xzcube["energy"] == cube["energy"]]
        xy_edep_equivalence = [cube for cube in xy_corresponds if xzcube["energy"] == cube["energy"]]

        if yz_edep_equivalence and xy_edep_equivalence:
            yzcube = yz_edep_equivalence[0]
            xycube = xy_edep_equivalence[0]
            assert (xzcube["energy"] == yzcube["energy"] and xzcube["energy"] == xycube["energy"])
            if all(item in clusterized_cubes for item in [xzcube, yzcube, xycube]):
                # pass
                if xzcube in xz_cubes: xz_cubes.remove(xzcube)
                if yzcube in yz_cubes: yz_cubes.remove(yzcube)
                if xycube in xy_cubes: xy_cubes.remove(xycube)
            else:
                # clusters_xz[n_clusters_over_xz] = [xzcube]
                # clusters_yz[n_clusters_over_yz] = [yzcube]
                # clusters_xy[n_clusters_over_xy] = [xycube]
                clusters_3d[n_clusters_3d] = [xzcube, yzcube, xycube]
                clusterized_cubes.extend([xzcube, yzcube, xycube])
                # cubes_in_clusters_xz[n_clusters_over_xz] = xzcube
                # cubes_in_clusters_yz[n_clusters_over_yz] = yzcube
                # cubes_in_clusters_xy[n_clusters_over_xy] = xycube
                # n_clusters_over_xz += 1
                # n_clusters_over_yz += 1
                # n_clusters_over_xy += 1
                n_clusters_3d += 1
                if xzcube in xz_cubes: xz_cubes.remove(xzcube)
                if yzcube in yz_cubes: yz_cubes.remove(yzcube)
                if xycube in xy_cubes: xy_cubes.remove(xycube)
                # xz_cubes.remove(xzcube)
                # yz_cubes.remove(yzcube)
                # xy_cubes.remove(xycube)
        elif yz_edep_equivalence:
            yzcube = yz_edep_equivalence[0]
            cube2change = [cube for cube in xy_corresponds if (cube["x"] == xzcube["x"] and cube["y"] == yzcube["x"])][0]
            cube2change_pos = xy_cubes.index(cube2change)
            if xy_cubes[cube2change_pos] not in processed_cubes:
                # print("!!! ", xy_cubes[cube2change_pos], yzcube, xy_cubes[cube2change_pos]["energy"], yzcube["energy"])
                xy_cubes[cube2change_pos]["energy"] = str(float(xy_cubes[cube2change_pos]["energy"]) - float(yzcube["energy"]))
                # print("!!! ", xy_cubes[cube2change_pos], yzcube, xy_cubes[cube2change_pos]["energy"], yzcube["energy"])
                processed_cubes.append(xy_cubes[cube2change_pos])
        elif xy_edep_equivalence:
            xycube = xy_edep_equivalence[0]
            cube2change = [cube for cube in yz_corresponds if (cube["y"] == xzcube["y"] and cube["x"] == xycube["y"])][0]
            cube2change_pos = yz_cubes.index(cube2change)
            if yz_cubes[cube2change_pos] not in processed_cubes:
                yz_cubes[cube2change_pos]["energy"] = str(float(yz_cubes[cube2change_pos]["energy"]) - float(xycube["energy"]))
                processed_cubes.append(yz_cubes[cube2change_pos])

        # nearest_neighbours = [cube for cube in xz_cubes if 1.0 <= compute_distance(cube, xzcube) <= 2.0]

        # if len(nearest_neighbours) == 0:
        #     clusters_xz[n_clusters_over_xz] = [xzcube]
        #     cubes_in_clusters_xz[n_clusters_over_xz] = xzcube
        #     xz_cubes.remove(xzcube)
        #     n_clusters_over_xz += 1

    for yzcube in yz_cubes:
        xz_corresponds = [cube for cube in xz_cubes if yzcube["y"] == cube["y"]]
        xy_corresponds = [cube for cube in xy_cubes if yzcube["x"] == cube["y"]]

        # check if cube is single
        xz_edep_equivalence = [cube for cube in xz_corresponds if yzcube["energy"] == cube["energy"]]
        xy_edep_equivalence = [cube for cube in xy_corresponds if yzcube["energy"] == cube["energy"]]

        if xz_edep_equivalence and xy_edep_equivalence:
            xzcube = xz_edep_equivalence[0]
            xycube = xy_edep_equivalence[0]
            assert (xzcube["energy"] == yzcube["energy"] and xzcube["energy"] == xycube["energy"])
            if all(item in clusterized_cubes for item in [xzcube, yzcube, xycube]):
                # pass
                if xzcube in xz_cubes: xz_cubes.remove(xzcube)
                if yzcube in yz_cubes: yz_cubes.remove(yzcube)
                if xycube in xy_cubes: xy_cubes.remove(xycube)
            else:
                # clusters_xz[n_clusters_over_xz] = [xzcube]
                # clusters_yz[n_clusters_over_yz] = [yzcube]
                # clusters_xy[n_clusters_over_xy] = [xycube]
                clusters_3d[n_clusters_3d] = [xzcube, yzcube, xycube]
                clusterized_cubes.extend([xzcube, yzcube, xycube])
                # cubes_in_clusters_xz[n_clusters_over_xz] = xzcube
                # cubes_in_clusters_yz[n_clusters_over_yz] = yzcube
                # cubes_in_clusters_xy[n_clusters_over_xy] = xycube
                # n_clusters_over_xz += 1
                # n_clusters_over_yz += 1
                # n_clusters_over_xy += 1
                n_clusters_3d += 1
                if xzcube in xz_cubes: xz_cubes.remove(xzcube)
                if yzcube in yz_cubes: yz_cubes.remove(yzcube)
                if xycube in xy_cubes: xy_cubes.remove(xycube)
                # xz_cubes.remove(xzcube)
                # yz_cubes.remove(yzcube)
                # xy_cubes.remove(xycube)
        elif xz_edep_equivalence:
            xzcube = xz_edep_equivalence[0]
            cube2change = [cube for cube in xy_corresponds if (cube["x"] == xzcube["x"] and cube["y"] == yzcube["x"])][0]
            cube2change_pos = xy_cubes.index(cube2change)
            if xy_cubes[cube2change_pos] not in processed_cubes:
                xy_cubes[cube2change_pos]["energy"] = str(float(xy_cubes[cube2change_pos]["energy"]) - float(xzcube["energy"]))
                processed_cubes.append(xy_cubes[cube2change_pos])
        elif xy_edep_equivalence:
            xycube = xy_edep_equivalence[0]
            cube2change = [cube for cube in xz_corresponds if (cube["x"] == xycube["x"] and cube["y"] == yzcube["y"])][0]
            cube2change_pos = xz_cubes.index(cube2change)
            if xz_cubes[cube2change_pos] not in processed_cubes:
                xz_cubes[cube2change_pos]["energy"] = str(float(xz_cubes[cube2change_pos]["energy"]) - float(xycube["energy"]))
                processed_cubes.append(xz_cubes[cube2change_pos])

        # nearest_neighbours = [cube for cube in yz_cubes if 1.0 <= compute_distance(cube, yzcube) <= 2.0]

    for xycube in xy_cubes:
        yz_corresponds = [cube for cube in yz_cubes if xycube["y"] == cube["x"]]
        xz_corresponds = [cube for cube in xz_cubes if xycube["x"] == cube["x"]]

        # check if cube is single
        yz_edep_equivalence = [cube for cube in yz_corresponds if xycube["energy"] == cube["energy"]]
        xz_edep_equivalence = [cube for cube in xz_corresponds if xycube["energy"] == cube["energy"]]

        if yz_edep_equivalence and xz_edep_equivalence:
            xzcube = xz_edep_equivalence[0]
            yzcube = yz_edep_equivalence[0]
            assert (xzcube["energy"] == yzcube["energy"] and xzcube["energy"] == xycube["energy"])
            if all(item in clusterized_cubes for item in [xzcube, yzcube, xycube]):
                # pass
                if xzcube in xz_cubes: xz_cubes.remove(xzcube)
                if yzcube in yz_cubes: yz_cubes.remove(yzcube)
                if xycube in xy_cubes: xy_cubes.remove(xycube)
            else:
                # clusters_xz[n_clusters_over_xz] = [xzcube]
                # clusters_yz[n_clusters_over_yz] = [yzcube]
                # clusters_xy[n_clusters_over_xy] = [xycube]
                clusters_3d[n_clusters_3d] = [xzcube, yzcube, xycube]
                clusterized_cubes.extend([xzcube, yzcube, xycube])
                # cubes_in_clusters_xz[n_clusters_over_xz] = xzcube
                # cubes_in_clusters_yz[n_clusters_over_yz] = yzcube
                # cubes_in_clusters_xy[n_clusters_over_xy] = xycube
                # n_clusters_over_xz += 1
                # n_clusters_over_yz += 1
                # n_clusters_over_xy += 1
                n_clusters_3d += 1
                if xzcube in xz_cubes: xz_cubes.remove(xzcube)
                if yzcube in yz_cubes: yz_cubes.remove(yzcube)
                if xycube in xy_cubes: xy_cubes.remove(xycube)
                # xz_cubes.remove(xzcube)
                # yz_cubes.remove(yzcube)
                # xy_cubes.remove(xycube)
        elif xz_edep_equivalence:
            xzcube = xz_edep_equivalence[0]
            cube2change = [cube for cube in yz_corresponds if (cube["y"] == xzcube["y"] and cube["x"] == xycube["y"])][0]
            cube2change_pos = yz_cubes.index(cube2change)
            if yz_cubes[cube2change_pos] not in processed_cubes:
                yz_cubes[cube2change_pos]["energy"] = str(float(yz_cubes[cube2change_pos]["energy"]) - float(xzcube["energy"]))
                processed_cubes.append(yz_cubes[cube2change_pos])
        elif yz_edep_equivalence:
            yzcube = yz_edep_equivalence[0]
            cube2change = [cube for cube in xz_corresponds if (cube["x"] == xycube["x"] and cube["y"] == yzcube["y"])][0]
            cube2change_pos = xz_cubes.index(cube2change)
            if xz_cubes[cube2change_pos] not in processed_cubes:
                xz_cubes[cube2change_pos]["energy"] = str(float(xz_cubes[cube2change_pos]["energy"]) - float(yzcube["energy"]))
                processed_cubes.append(xz_cubes[cube2change_pos])

        # nearest_neighbours = [cube for cube in xy_cubes if 1.0 <= compute_distance(cube, xycube) <= 2.0]

    # print("\nclusters_xz: ", clusters_xz)
    # print("\nclusters_yz: ", clusters_yz)
    # print("\nclusters_xy: ", clusters_xy)
    # print("\nclusters_3d: ", clusters_3d)
    # return cubes_array
    for item in clusters_3d.items():
        print(item)

    res = {
        "xz_cubes_unclusterized": xz_cubes,
        "yz_cubes_unclusterized": yz_cubes,
        "xy_cubes_unclusterized": xy_cubes,
        "clusters_xz": clusters_xz,
        "clusters_yz": clusters_yz,
        "clusters_xy": clusters_xy,
        "clusters_3d": clusters_3d,
    }
    return res


if __name__ == "__main__":
    pass
